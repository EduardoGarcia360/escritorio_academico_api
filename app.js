import express from "express";
import cors from 'cors'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { db } from "./models/index.js";
import escritorioRoutes from "./routes/routes.js";
import encryptResponse from "./middlewares/responseEncryptMiddleware.js";
import { PORT } from "./config.js";

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
}

app.listen(8000, () => {
    console.log(`server activo en http://localhost:${PORT}/`)
})
