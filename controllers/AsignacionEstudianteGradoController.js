import AsignacionEstudianteGrado from "../models/AsignacionEstudianteGrado.js";
import { decodeJWT } from "../utils/codificar.js";

export const getAllAsignacionesEstudianteGrado = async (req, res) => {
    try {
        const asignaciones = await AsignacionEstudianteGrado.findAll();
        res.status(200).json(asignaciones);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const getAllAsignacionesEstudianteGradoByGrado = async (req, res) => {
    try {
        const asignaciones = await AsignacionEstudianteGrado.findAll({
            where: {
                id_grado: req.params.id
            }
        });
        res.status(200).json(asignaciones);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const getAsignacionEstudianteGrado = async (req, res) => {
    try {
        const asignacion = await AsignacionEstudianteGrado.findAll({
            where: {
                id_asignacion: req.params.id
            }
        });
        res.status(200).json(asignacion[0]);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const createAsignacionEstudianteGrado = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        req.body.id_usuario_creo = userData.id
        
        await AsignacionEstudianteGrado.create(req.body);
        res.status(200).json({ status: 'OK', message: 'Asignación de estudiante a grado creada correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const updateAsignacionEstudianteGrado = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        req.body.id_usuario_modifico = userData.id

        await AsignacionEstudianteGrado.update(req.body, {
            where: {
                id_asignacion: req.params.id
            }
        });
        res.status(200).json({ status: 'OK', message: 'Asignación de estudiante a grado actualizada correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const deleteAsignacionEstudianteGrado = async (req, res) => {
    try {
        const asignacion = await AsignacionEstudianteGrado.findOne({
            where: { id_asignacion: req.params.id }
        });

        if (!asignacion) {
            return res.status(400).json({ status: 'ERROR', message: 'Asignación no encontrada' });
        }

        await AsignacionEstudianteGrado.destroy({
            where: {
                id_asignacion: req.params.id
            }
        });
        res.status(200).json({ status: 'OK', message: 'Asignación eliminada correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};
