import express from "express";
import cors from 'cors'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { db } from "./models/index.js";
import escritorioRoutes from "./routes/routes.js";
import encryptResponse from "./middlewares/responseEncryptMiddleware.js";
import { 
    PORT,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
} from "./config.js";

dotenv.config({ path: './development.env' });
const app = express()

app.use(cors({
    origin: `http://localhost:${PORT}`,
    credentials: true, // Permite el envío de cookies y credenciales
}))
app.use(express.json())
app.use(cookieParser()); // Habilita el middleware para manejar cookies
app.use(encryptResponse);
app.use('/escritorio', escritorioRoutes)

try {
    await db.authenticate()
    console.log('conexión a la base')
} catch (error) {
    console.error(`error de conexión en bd: ${error}`)
    console.error(`host: ${DB_HOST}, port: ${DB_PORT}, name: ${DB_NAME}, user: ${DB_USER}, password: ${DB_PASSWORD}`)
}

app.listen(8000, () => {
    console.log(`server activo en http://localhost:${PORT}/`)
})
