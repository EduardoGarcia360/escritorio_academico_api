import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Usuario from "../models/Usuario.js";
import UsuarioColegio from "../models/UsuarioColegio.js";

export const login = async (req, res) => {
    const { nombre_usuario, contrasena } = req.body;

    try {
        // Buscar usuario por nombre_usuario
        const usuario = await Usuario.findOne({
            where: {
                nombre_usuario: nombre_usuario,
                estado: 'A' // Validar que el usuario esté activo
            }
        });

        if (!usuario) {
            return res.status(401).json({ status: 'ERROR', message: "Usuario no encontrado" });
        }
        
        // Comparar contraseñas
        const isPasswordValid = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!isPasswordValid) {
            return res.status(401).json({ status: 'ERROR', message: "Credenciales incorrectas" });
        }

        // Se busca al colegio que pertenece
        const usuarioColegio = await UsuarioColegio.findOne({
            where: {
                id_usuario: usuario.id_usuario
            }
        });

        if (!usuarioColegio) {
            return res.status(401).json({ status: 'ERROR', message: "Usuario no asociado a un colegio" });
        }

        // Generar token
        const user = {
            id: usuario.id_usuario,
            username: usuario.nombre_usuario,
            role: usuario.rol,
            id_colegio: usuarioColegio.id_colegio
        };

        // console.log('variablesENV', process.env.JWT_SECRET, process.env.TIME_EXPIRE_TOKEN_JWT, process.env.TIME_EXPIRE_TOKEN);

        const token = jwt.sign(user, process.env.JWT_SECRET, 
            { 
                expiresIn: process.env.TIME_EXPIRE_TOKEN_JWT
            });

        // cookie HTTPOnly
        const timeExpireCookie = parseInt(process.env.TIME_EXPIRE_TOKEN);
        const duracionCookie = (timeExpireCookie * 60 * 60 * 1000);
        // console.log('duracionCookie', duracionCookie, 'tipo de dato', typeof duracionCookie);

        res.cookie('token', token, {
            httpOnly: true, // No accesible desde JavaScript
            secure: process.env.AMBIENTE === "PROD", // Solo en HTTPS en producción
            sameSite: process.env.AMBIENTE === "PROD" ? "None" : "lax", // Protege contra ataques CSRF
            domain: process.env.HOST, // Dominio de la cookie
            maxAge: duracionCookie, // Duración del token en milisegundos
        });

        // console.log('TOKEN LOGIN', token);

        return res.json({ status: 'OK', message: 'Inicio de Sesión Correcto', role: usuario.rol });
    } catch (error) {
        return res.status(500).json({ status: 'ERROR', message: "Error interno del servidor", error: error.message });
    }
};

export const validateSession = async (req, res) => {
    try {
        res.status(200).json({ status: 'OK', message: 'Token válido' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message })
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            secure: process.env.AMBIENTE === "PROD", // Solo en HTTPS en producción
            sameSite: process.env.AMBIENTE === "PROD" ? "None" : "lax", // Protege contra ataques CSRF
            domain: process.env.AMBIENTE === "PROD" ? process.env.HOST : undefined, // Dominio de la cookie
            expires: new Date(0) // Expira la cookie inmediatamente
        });
    
        res.status(200).json({ message: "Sesión cerrada correctamente" });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message })
    }
}
