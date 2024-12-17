import express from "express";
import cors from 'cors'
import dotenv from 'dotenv';
import { db } from "./models/index.js";
import escritorioRoutes from "./routes/routes.js";

dotenv.config({ path: './development.env' });
const app = express()

app.use(cors())
app.use(express.json())
app.use('/escritorio', escritorioRoutes)

try {
    await db.authenticate()
    console.log('conexión a la base')
} catch (error) {
    console.error(`error de conexión en bd: ${error}`)
}

app.listen(8000, () => {
    console.log('server activo en http://localhost:8000/')
})
