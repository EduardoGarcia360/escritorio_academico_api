import express from "express";
import cors from 'cors'
import dotenv from 'dotenv';
const ambiente = 'production';
dotenv.config({ path: `./${ambiente}.env` });
import cookieParser from 'cookie-parser';
import { db } from "./models/index.js";
import escritorioRoutes from "./routes/routes.js";
import encryptResponse from "./middlewares/responseEncryptMiddleware.js";

const app = express();
let dominiosPermitidos = [];
if (ambiente === 'development') {
    const desarrollo = `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}`;
    dominiosPermitidos = [desarrollo];
} else {
    const produccion = `${process.env.PROTOCOL}://${process.env.HOST}`
    const principal = `${process.env.PROTOCOL}://${process.env.HOST_VERCEL}`
    const secundario = `${process.env.PROTOCOL}://${process.env.SUB_HOST}`
    console.log('dominiosPermitidos', produccion, principal, secundario);
    dominiosPermitidos = [produccion, principal, secundario];
}

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || dominiosPermitidos.includes(origin)) {
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
    if (dominiosPermitidos.includes(origin)) {
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
app.use('/escritorio', escritorioRoutes); // Habilita las rutas de escritorio

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

app.listen(8000, () => {
    console.log(`server activo en:`, dominiosPermitidos);
})
