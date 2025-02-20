import express from "express";
import cors from 'cors'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { db } from "./models/index.js";
import escritorioRoutes from "./routes/routes.js";
import encryptResponse from "./middlewares/responseEncryptMiddleware.js";
import { 
    PROTOCOL,
    HOST,
    PORT,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
} from "./config.js";

dotenv.config({ path: './development.env' });
const app = express();
const produccion = `${PROTOCOL}://${HOST}`;
const desarrollo = `${PROTOCOL}://localhost:${PORT}`;
const dominiosPermitidos = [produccion, desarrollo];

app.use(cors({
    origin: dominiosPermitidos, // Origenes permitidos
    credentials: true, // Permite el envío de cookies y credenciales
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
})); // Habilita el middleware para manejar CORS
app.use(express.json()); // Habilita el middleware para manejar JSON
app.use(cookieParser()); // Habilita el middleware para manejar cookies
app.use(encryptResponse); // Habilita el middleware para encriptar la respuesta
app.use('/escritorio', escritorioRoutes); // Habilita las rutas de escritorio

try {
    await db.authenticate()
    console.log('conexión a la base')
} catch (error) {
    console.error(`error de conexión en bd: ${error}`)
    console.error(`host: ${DB_HOST}, port: ${DB_PORT}, name: ${DB_NAME}, user: ${DB_USER}, password: ${DB_PASSWORD}`)
}

app.listen(8000, () => {
    console.log(`server activo en ${produccion}`)
})
