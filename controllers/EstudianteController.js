import Estudiante from "../models/Estudiante.js";
import CuotaColegio from "../models/CuotaColegio.js";
import { decodeJWT } from "../utils/codificar.js";
import UsuarioTutor from "../models/UsuarioTutor.js";
import TutorEstudiante from "../models/TutorEstudiante.js";

export const getAllEstudiantes = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        const estudiantes = await Estudiante.findAll({
            where: {
                id_colegio: userData.id_colegio
            }
        });
        res.status(200).json(estudiantes);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const getEstudiante = async (req, res) => {
    try {
        const estudiante = await Estudiante.findOne({
            where: {
                id_estudiante: req.params.id
            }
        });
        res.status(200).json(estudiante);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const getEstudiantesByUsuarioTutor = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        // Buscar el UsuarioTutor para obtener el id_tutor
        const usuarioTutor = await UsuarioTutor.findOne({
            where: { id_usuario: userData.id },
            attributes: ['id_tutor']
        });

        if (!usuarioTutor) {
            return res.status(404).json({ status: 'ERROR', message: "Usuario-Tutor no encontrado" });
        }

        // Obtener los estudiantes asociados al tutor a través de TutorEstudiante
        const estudiantes = await Estudiante.findAll({
            include: [
                {
                    model: TutorEstudiante,
                    where: { id_tutor: usuarioTutor.id_tutor },
                    attributes: [] // No incluir los datos de TutorEstudiante en la respuesta
                }
            ],
            attributes: ['id_estudiante', 'nombre_completo'] // Solo los datos necesarios del estudiante
        });

        res.status(200).json(estudiantes);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const createEstudiante = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        // Validar si existe un registro en CuotaColegio
        const cuotaColegio = await CuotaColegio.findOne({
            where: { id_colegio: userData.id_colegio }
        });

        if (!cuotaColegio) {
            return res.status(400).json({ status: 'ERROR', message: 'No se creó la cantidad de la cuota' });
        }

        req.body.id_usuario_creo = userData.id
        req.body.id_colegio = userData.id_colegio
        
        const newEstudiante = await Estudiante.create(req.body);

        res.status(200).json({ 
            status: 'OK', 
            message: 'Estudiante creado correctamente!',
            id_estudiante: newEstudiante.id_estudiante
        });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const updateEstudiante = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        req.body.id_usuario_modifico = userData.id

        await Estudiante.update(req.body, {
            where: {
                id_estudiante: req.params.id
            }
        });
        res.status(200).json({ status: 'OK', message: 'Estudiante actualizado correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const deleteEstudiante = async (req, res) => {
    try {
        const estudiante = await Estudiante.findOne({
            where: { id_estudiante: req.params.id }
        });

        if (!estudiante) {
            return res.status(400).json({ status: 'ERROR', message: 'Estudiante no encontrado' });
        }

        await Estudiante.destroy({
            where: {
                id_estudiante: req.params.id
            }
        });
        res.status(200).json({ status: 'OK', message: 'Estudiante eliminado correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};
