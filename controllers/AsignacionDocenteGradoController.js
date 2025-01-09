import AsignacionDocenteGrado from "../models/AsignacionDocenteGrado.js";
import { decodeJWT } from "../utils/codificar.js";

export const getAllAsignacionesDocenteGrado = async (req, res) => {
    try {
        const asignaciones = await AsignacionDocenteGrado.findAll();
        res.status(200).json(asignaciones);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const getAsignacionDocenteGrado = async (req, res) => {
    try {
        const asignacion = await AsignacionDocenteGrado.findAll({
            where: {
                id_asignacion: req.params.id
            }
        });
        res.status(200).json(asignacion[0]);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const createAsignacionDocenteGrado = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        req.body.id_usuario_creo = userData.id
        
        await AsignacionDocenteGrado.create(req.body);
        res.status(200).json({ status: 'OK', message: 'Asignación de docente a grado creada correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const updateAsignacionDocenteGrado = async (req, res) => {
    try {
        await AsignacionDocenteGrado.update(req.body, {
            where: {
                id_asignacion: req.params.id
            }
        });
        res.status(200).json({ status: 'OK', message: 'Asignación de docente a grado actualizada correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const deleteAsignacionDocenteGrado = async (req, res) => {
    try {
        const asignacion = await AsignacionDocenteGrado.findOne({
            where: { id_asignacion: req.params.id }
        });

        if (!asignacion) {
            return res.status(400).json({ status: 'ERROR', message: 'Asignación no encontrada' });
        }

        await AsignacionDocenteGrado.destroy({
            where: {
                id_asignacion: req.params.id
            }
        });
        res.status(200).json({ status: 'OK', message: 'Asignación eliminada correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};
