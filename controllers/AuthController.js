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
        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: process.env.TIME_EXPIRE_TOKEN });

        return res.json({ status: 'OK', token });
    } catch (error) {
        return res.status(500).json({ status: 'ERROR', message: "Error interno del servidor", error: error.message });
    }
};
