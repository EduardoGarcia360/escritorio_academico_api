import UsuarioColegio from "../models/UsuarioColegio.js";
import Usuario from "../models/Usuario.js";
import { getRoleDescription } from "../utils/rolUsuarioMapeo.js";
import { getEstadoDescription } from "../utils/estadoMapeo.js";
import { decodeJWT } from "../utils/codificar.js";

export const getUsuariosByColegio = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(400).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        // Buscar las asociaciones de usuarios con el colegio especificado
        const usuarios = await UsuarioColegio.findAll({
            where: {
                id_colegio: userData.id_colegio
            },
            attributes: ['id_usuario_colegio', 'id_colegio', 'createdAt'], // Campos de UsuarioColegio
            include: [
                {
                    model: Usuario,
                    attributes: ['id_usuario', 'nombre_usuario', 'nombre_completo', 'correo_electronico', 'rol', 'estado'] // Campos de Usuario
                }
            ]
        });

        if (usuarios.length === 0) {
            return res.status(400).json({ status: 'ERROR', message: 'No se encontraron usuarios asociados a este colegio.' });
        }

        // Agregar descripción del rol a cada usuario
        const usuariosFixed = usuarios.map((usuario) => {
            const userData = usuario.toJSON();
            userData.correo_electronico = userData.Usuario.correo_electronico;
            userData.estado = userData.Usuario.estado;
            userData.id_usuario = userData.Usuario.id_usuario;
            userData.nombre_completo = userData.Usuario.nombre_completo;
            userData.rol = userData.Usuario.rol;
            userData.nombre_usuario = userData.Usuario.nombre_usuario;
            userData.desc_rol = getRoleDescription(userData.Usuario.rol);
            userData.desc_estado = getEstadoDescription(userData.Usuario.estado);
            delete userData.Usuario;
            return userData;
        });

        res.status(200).json(usuariosFixed);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const getUsuarioColegio = async (req, res) => {
    try {
        const usuarioColegio = await UsuarioColegio.findAll({
            where: {
                id_usuario_colegio: req.params.id
            }
        });
        res.status(200).json(usuarioColegio[0]);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const createUsuarioColegio = async (req, res) => {
    try {
        const { id_usuario } = req.body;

        // Verificar si el usuario ya está asociado a algún colegio
        const usuarioExistente = await UsuarioColegio.findOne({
            where: {
                id_usuario: id_usuario
            }
        });

        if (usuarioExistente) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'El usuario ya está asociado a otro colegio. No se puede repetir la asociación.'
            });
        }

        // Crear la nueva relación usuario-colegio
        await UsuarioColegio.create(req.body);
        res.status(200).json({ status: 'OK', message: 'Relación usuario-colegio creada correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const deleteUsuarioColegio = async (req, res) => {
    try {
        const usuarioColegio = await UsuarioColegio.findOne({
            where: { id_usuario_colegio: req.params.id }
        });

        if (!usuarioColegio) {
            return res.status(400).json({ status: 'ERROR', message: 'Relación no encontrada' });
        }

        await UsuarioColegio.destroy({
            where: {
                id_usuario_colegio: req.params.id
            }
        });
        res.status(200).json({ status: 'OK', message: 'Relación usuario-colegio eliminada correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};
