import Usuario from "../models/Usuario.js";
import UsuarioColegio from "../models/UsuarioColegio.js";
import { decodeJWT } from "../utils/codificar.js";
import bcrypt from "bcrypt";
import { Op } from "sequelize";

export const getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll()
        res.status(200).json(usuarios)
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message })
    }
}

export const getUsuario = async (req, res) => {
    try {
        // Obtener y decodificar el token
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(400).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        // Obtener los datos del usuario
        const usuario = await Usuario.findOne({
            where: {
                id_usuario: req.params.id
            }
        });

        if (!usuario) {
            return res.status(400).json({ status: 'ERROR', message: "Usuario no encontrado" });
        }

        // Verificar si el usuario está asociado al colegio del token
        const usuarioColegio = await UsuarioColegio.findOne({
            where: {
                id_usuario: req.params.id,
                id_colegio: userData.id_colegio // El colegio del token decodificado
            }
        });

        if (!usuarioColegio) {
            return res.status(400).json({ status: 'ERROR', message: "El usuario no pertenece al colegio asociado" });
        }

        res.status(200).json(usuario);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const getMiUsuario = async (req, res) => {
    try {
        // Obtener y decodificar el token
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(400).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        // Obtener los datos del usuario
        const usuario = await Usuario.findOne({
            where: {
                id_usuario: userData.id
            }
        });

        if (!usuario) {
            return res.status(400).json({ status: 'ERROR', message: "Usuario no encontrado" });
        }

        res.status(200).json(usuario);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const createUsuario = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(400).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        req.body.id_colegio = userData.id_colegio;

        // Verificar si el nombre de usuario ya existe
        const usuarioExistente = await Usuario.findOne({
            where: { nombre_usuario: req.body.nombre_usuario }
        });
        if (usuarioExistente) {
            return res.status(400).json({ status: 'ERROR', message: "Usuario ya en uso" });
        }

        // Verificar si el correo electrónico ya existe
        const correoExistente = await Usuario.findOne({
            where: { correo_electronico: req.body.correo_electronico }
        });
        if (correoExistente) {
            return res.status(400).json({ status: 'ERROR', message: "Correo ya en uso" });
        }

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        req.body.contrasena = await bcrypt.hash(req.body.contrasena, salt);

        // Crear el usuario
        const usuario = await Usuario.create(req.body);

        // Crear la relación en UsuarioColegio
        await UsuarioColegio.create({
            id_usuario: usuario.id_usuario,
            id_colegio: userData.id_colegio
        })
        res.status(200).json({ status: 'OK', message: 'Usuario creado correctamente!' });
    } catch (error) {
        // console.log('crear', error)
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const updateUsuario = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(400).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        const usuarioColegio = await UsuarioColegio.findOne({
            where: {
                id_usuario: req.params.id,
                id_colegio: userData.id_colegio
            }
        });

        if (!usuarioColegio) {
            return res.status(400).json({ status: 'ERROR', message: "El usuario no pertenece al colegio asociado" });
        }

        // Validar si el nombre_usuario ya existe en otros registros
        if (req.body.nombre_usuario) {
            const usuarioExistente = await Usuario.findOne({
                where: {
                    nombre_usuario: req.body.nombre_usuario,
                    id_usuario: { [Op.ne]: req.params.id } // Excluir el usuario actual
                }
            });
            if (usuarioExistente) {
                return res.status(400).json({ status: 'ERROR', message: "Usuario ya en uso" });
            }
        }

        // Validar si el correo_electronico ya existe en otros registros
        if (req.body.correo_electronico) {
            const correoExistente = await Usuario.findOne({
                where: {
                    correo_electronico: req.body.correo_electronico,
                    id_usuario: { [Op.ne]: req.params.id } // Excluir el usuario actual
                }
            });
            if (correoExistente) {
                return res.status(400).json({ status: 'ERROR', message: "Correo ya en uso" });
            }
        }

        if (req.body.contrasena) {
            // si el usuario envio un cambio de contraseña
            // Encriptar la nueva contraseña
            const salt = await bcrypt.genSalt(10);
            req.body.contrasena = await bcrypt.hash(req.body.contrasena, salt);
        }
        await Usuario.update(req.body, {
            where: {
                id_usuario: req.params.id
            }
        });
        res.status(200).json({ status: 'OK', message: 'Usuario actualizado correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const deleteUsuario = async (req, res) => {
    try {
        // Buscar el registro que se desea eliminar
        const usuario = await Usuario.findOne({ where: { id_usuario: req.params.id } });

        if (!usuario) {
            return res.status(400).json({ status: 'ERROR', message: 'Registro no encontrado' });
        }

        await Usuario.destroy({
            where: {
                id_usuario: req.params.id
            }
        })
        res.status(200).json({ status: 'OK', message: 'Registro eliminado correctamente!' })
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message })
    }
}