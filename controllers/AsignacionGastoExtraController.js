import AsignacionGastoExtra from "../models/AsignacionGastoExtra.js";
import { decodeJWT } from "../utils/codificar.js";

export const getAllAsignacionesGastoExtra = async (req, res) => {
    try {
        const asignaciones = await AsignacionGastoExtra.findAll();
        res.status(200).json(asignaciones);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAsignacionGastoExtra = async (req, res) => {
    try {
        const asignacion = await AsignacionGastoExtra.findOne({
            where: {
                id_asignacion: req.params.id
            }
        });

        if (!asignacion) {
            return res.status(400).json({ message: 'Asignación no encontrada' });
        }

        res.status(200).json(asignacion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const createAsignacionGastoExtra = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        req.body.id_usuario_creo = userData.id;

        const nuevaAsignacion = await AsignacionGastoExtra.create(req.body);
        res.status(200).json({ message: 'Asignación creada correctamente!', asignacion: nuevaAsignacion });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateAsignacionGastoExtra = async (req, res) => {
    try {
        const [updated] = await AsignacionGastoExtra.update(req.body, {
            where: {
                id_asignacion: req.params.id
            }
        });

        if (updated) {
            const asignacionActualizada = await AsignacionGastoExtra.findOne({ where: { id_asignacion: req.params.id } });
            return res.status(200).json({ message: 'Asignación actualizada correctamente!', asignacion: asignacionActualizada });
        }

        return res.status(400).json({ message: 'Asignación no encontrada' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteAsignacionGastoExtra = async (req, res) => {
    try {
        const asignacion = await AsignacionGastoExtra.findOne({
            where: { id_asignacion: req.params.id }
        });

        if (!asignacion) {
            return res.status(400).json({ message: 'Asignación no encontrada' });
        }

        await AsignacionGastoExtra.destroy({
            where: {
                id_asignacion: req.params.id
            }
        });

        res.status(200).json({ message: 'Asignación eliminada correctamente!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
