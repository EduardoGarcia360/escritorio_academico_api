import Tutor from "../models/Tutor.js";
import TutorEstudiante from "../models/TutorEstudiante.js";
import UsuarioTutor from "../models/UsuarioTutor.js";
import Usuario from "../models/Usuario.js";
import { decodeJWT } from "../utils/codificar.js";
import bcrypt from "bcrypt";
import { Op } from "sequelize";

export const getAllTutores = async (req, res) => {
    try {
        const { id } = req.params; // ID del estudiante

        // Obtener los tutores asociados al estudiante
        const tutoresEstudiante = await TutorEstudiante.findAll({
            where: {
                id_estudiante: id
            },
            attributes: ['es_responsable_principal'], // Campos de TutorEstudiante
            include: [
                {
                    model: Tutor,
                    attributes: [
                        'id_tutor', 
                        'id_colegio',
                        'nombre_completo', 
                        'identificacion',
                        'telefono',
                        'correo_electronico',
                        'direccion',
                        'relacion_colegio',
                    ]
                }
            ]
        });

        const tutores = tutoresEstudiante.map((relacion) => {
            const tutorData = relacion.Tutor.toJSON();
            tutorData.es_responsable_principal = relacion.es_responsable_principal;
            return tutorData;
        });

        res.status(200).json(tutores);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const getTutor = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        const tutoresEstudiante = await TutorEstudiante.findAll({
            where: {
                id_tutor: req.params.id
            },
            attributes: ['es_responsable_principal'], // Campos de TutorEstudiante
            include: [
                {
                    model: Tutor,
                    attributes: [
                        'id_tutor', 
                        'id_colegio',
                        'nombre_completo', 
                        'identificacion',
                        'telefono',
                        'correo_electronico',
                        'direccion',
                        'relacion_colegio',
                    ]
                }
            ]
        });

        const tutores = tutoresEstudiante.map((relacion) => {
            const tutorData = relacion.Tutor.toJSON();
            tutorData.es_responsable_principal = relacion.es_responsable_principal;
            return tutorData;
        });

        res.status(200).json(tutores[0]);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const createTutor = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        // Crear la relación TutorEstudiante
        if (req.body.id_estudiante) {
            // Asignar los valores del usuario que creó el tutor
            req.body.id_usuario_creo = userData.id;
            req.body.id_colegio = userData.id_colegio;

            // Crear el tutor
            const tutor = await Tutor.create(req.body);

            await TutorEstudiante.create({
                id_tutor: tutor.id_tutor,
                id_estudiante: req.body.id_estudiante,
                relacion: req.body.relacion_colegio, // Usar el campo de relación del tutor
                es_responsable_principal: req.body.es_responsable_principal || false, // Valor por defecto si no se envía
                id_usuario_creo: req.body.id_usuario_creo
            });

            // Crear el usuario del tutor
            const userParams = {
                nombre_usuario: req.body.correo_electronico,
                contrasena: req.body.contrasena,
                nombre_completo: req.body.nombre_completo,
                correo_electronico: req.body.correo_electronico,
                rol: 'P', // Padre de familia
                estado: 'A',
            }

            const usuario = await Usuario.create(userParams);

            // Crear la relación en UsuarioTutor
            await UsuarioTutor.create({
                id_usuario: usuario.id_usuario,
                id_tutor: tutor.id_tutor,
                id_usuario_creo: userData.id
            });

            res.status(200).json({ status: 'OK', message: 'Tutor y relación creados correctamente!' });
        } else {
            return res.status(400).json({ status: 'ERROR', message: "No hay estudiante asociado" });
        }

    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const updateTutor = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        req.body.id_usuario_modifico = userData.id

        // Validar si el correo_electronico ya existe en otros registros
        if (req.body.correo_electronico) {
            const correoExistente = await Tutor.findOne({
                where: {
                    correo_electronico: req.body.correo_electronico,
                    id_tutor: { [Op.ne]: req.params.id } // Excluir el tutor actual
                }
            });
            // console.log('correo de tutor222', correoExistente)
            if (correoExistente) {
                return res.status(400).json({ status: 'ERROR', message: "Correo ya en uso" });
            }
        }

        // console.log('contrasena', req.body.contrasena)
        if (req.body.contrasena) {
            // si el usuario envio un cambio de contraseña
            // Encriptar la nueva contraseña
            const salt = await bcrypt.genSalt(10);
            req.body.contrasena = await bcrypt.hash(req.body.contrasena, salt);
        }

        const objUsuarioTutor = await UsuarioTutor.findOne({
            where: { id_tutor: req.params.id }
        });

        // console.log('validacion usuario', req.body.correo_electronico, objUsuarioTutor)
        if (req.body.correo_electronico) {
            const correoExistente = await Usuario.findOne({
                where: {
                    correo_electronico: req.body.correo_electronico,
                    id_usuario: { [Op.ne]: objUsuarioTutor.id_usuario } // Excluir el usuario actual
                }
            });
            // console.log('correo de usuario', correoExistente)
            if (correoExistente) {
                return res.status(400).json({ status: 'ERROR', message: "Correo ya en uso" });
            }
        }

        await Tutor.update(req.body, {
            where: {
                id_tutor: req.params.id
            }
        });

        await TutorEstudiante.update({ 
            es_responsable_principal: req.body.es_responsable_principal,
            id_usuario_modifico: userData.id
        }, {
            where: {
                id_tutor: req.params.id
            }
        })

        // Actualizar el usuario del tutor
        let userParams = {
            nombre_usuario: req.body.correo_electronico,
            nombre_completo: req.body.nombre_completo,
            correo_electronico: req.body.correo_electronico,
            id_usuario_modifico: userData.id,
        }

        if (req.body.contrasena) {
            userParams.contrasena = req.body.contrasena;
        }

        await Usuario.update(userParams, {
            where: {
                id_usuario: objUsuarioTutor.id_usuario
            }
        });
        
        res.status(200).json({ status: 'OK', message: 'Tutor actualizado correctamente!' });
    } catch (error) {
        console.log('ERROR', error)
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const deleteTutor = async (req, res) => {
    try {
        // Verificar si el tutor existe
        const tutor = await Tutor.findOne({
            where: { id_tutor: req.params.id }
        });

        if (!tutor) {
            return res.status(400).json({ status: 'ERROR', message: 'Tutor no encontrado' });
        }

        // Eliminar relaciones en TutorEstudiante
        await TutorEstudiante.destroy({
            where: { id_tutor: req.params.id }
        });

        // Eliminar el tutor
        await Tutor.destroy({
            where: { id_tutor: req.params.id }
        });

        res.status(200).json({ status: 'OK', message: 'Tutor eliminado correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};
