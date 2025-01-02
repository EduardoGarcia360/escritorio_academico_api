import Estudiante from "../models/Estudiante.js";
import { decodeJWT } from "../utils/codificar.js";

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
        const estudiante = await Estudiante.findAll({
            where: {
                id_estudiante: req.params.id
            }
        });
        res.status(200).json(estudiante[0]);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const createEstudiante = async (req, res) => {
    try {
        await Estudiante.create(req.body);
        res.status(200).json({ status: 'OK', message: 'Estudiante creado correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const updateEstudiante = async (req, res) => {
    try {
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
