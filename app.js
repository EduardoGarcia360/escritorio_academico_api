import { ambiente } from "./utils/ambiente.js";
import express from "express";
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config({ path: `./${ambiente}.env` });
import cookieParser from 'cookie-parser';
import { db } from "./models/index.js";
import escritorioRoutes from "./routes/routes.js";
import encryptResponse from "./middlewares/responseEncryptMiddleware.js";
import { isOriginAllowed } from "./utils/dominio.js";
import http from "http";
import { Server as SocketIOServer } from "socket.io";

const app = express();
let dominiosPermitidos = [];
if (ambiente === 'development') {
    const desarrollo = `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.LOCAL_PORT}`;
    dominiosPermitidos = [desarrollo];
} else {
    const produccion = `${process.env.PROTOCOL}://${process.env.HOST}`
    const principal = `${process.env.PROTOCOL}://${process.env.HOST_VERCEL}`
    const aleatorio = /^https:\/\/escritorio-academico-front-[a-z0-9]+-eduardo360s-projects\.vercel\.app$/
    // console.log('dominiosPermitidos', produccion, principal);
    dominiosPermitidos = [produccion, principal, aleatorio];
}

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || isOriginAllowed(origin, dominiosPermitidos)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    }, // Origenes permitidos
    credentials: true, // Permite el envío de cookies y credenciales
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
})); // Habilita el middleware para manejar CORS
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (isOriginAllowed(origin, dominiosPermitidos)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }
    next();
});
app.use(express.json()); // Habilita el middleware para manejar JSON
app.use(cookieParser()); // Habilita el middleware para manejar cookies
app.use(encryptResponse); // Habilita el middleware para encriptar la respuesta
app.use(express.urlencoded({ extended: true })); // Habilita el middleware para manejar datos URL-encoded
app.use('/escritorio', escritorioRoutes); // Habilita las rutas de escritorio
app.use('/uploads', express.static('uploads')); // Habilita el middleware para servir archivos estáticos desde la carpeta uploads

try {
    await db.authenticate()
    console.log(`conexión a la base - ${new Date().toLocaleString()}`);
} catch (error) {
    console.error(`error de conexión en bd: ${error}`)
    console.error(`host: ${process.env.DB_HOST}, 
        port: ${process.env.DB_PORT}, 
        name: ${process.env.DB_NAME}, 
        user: ${process.env.DB_USER}, 
        password: ${process.env.DB_PASSWORD}`)
}

// Crear el servidor HTTP a partir de Express
const server = http.createServer(app);

// Crear el servidor de Socket.io sobre el servidor HTTP
const io = new SocketIOServer(server, {
    path: "/socket.io/",
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    },
});

// Configurar los eventos de Socket.io
io.on("connection", (socket) => {
    console.log("Cliente conectado a Socket.io");

    // Emitir mensaje de bienvenida
    socket.emit("message", "Conectado a Socket.io correctamente");

    socket.on("joinRoom", (roomId) => {
        socket.join(roomId);
        console.log(`Socket ${socket.id} se unió a la sala ${roomId}`);
    });
    
    // Envío a una sala específica
    socket.on("enviarMensajeARoom", ({ roomId, mensaje }) => {
        io.to(roomId).emit("message", mensaje);
        console.log(`Mensaje enviado a la sala ${roomId}:`, mensaje);
    });

    socket.on("connect_error", (err) => {
        console.error("Error de conexión con el cliente:", err);
    });

    socket.on("disconnect", () => {
        console.log("Cliente desconectado de Socket.io");
    });
});

// Usa el puerto asignado por Railway (o 8000 en desarrollo)
const PORT = 8000;

server.listen(PORT, () => {
    console.log(`Servidor activo en el puerto: ${PORT}`);
});
