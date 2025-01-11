import CuotaColegio from "../models/CuotaColegio.js";
import CuotaEstudiante from "../models/CuotaEstudiante.js";
import { decodeJWT } from "../utils/codificar.js";

export const getAllCuotasColegio = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        const cuotas = await CuotaColegio.findAll({
            where: {
                id_colegio: userData.id_colegio
            }
        });
        res.status(200).json(cuotas);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const getCuotaColegio = async (req, res) => {
    try {
        const cuota = await CuotaColegio.findAll({
            where: {
                id_cuota: req.params.id
            }
        });
        res.status(200).json(cuota[0]);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const createCuotaColegio = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        // Asignar los valores del usuario que creó el tutor
        req.body.id_usuario_creo = userData.id;
        req.body.id_colegio = userData.id_colegio;

        await CuotaColegio.create(req.body);
        res.status(200).json({ status: 'OK', message: 'Cuota de colegio creada correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const updateCuotaColegio = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        req.body.id_usuario_modifico = userData.id

        await CuotaColegio.update(req.body, {
            where: {
                id_cuota: req.params.id
            }
        });
        res.status(200).json({ status: 'OK', message: 'Cuota de colegio actualizada correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const deleteCuotaColegio = async (req, res) => {
    try {
        const asignado = await CuotaEstudiante.findOne({
            where: { id_cuota: req.params.id }
        })

        if (asignado) {
            return res.status(400).json({ status: 'ERROR', message: 'Cuota asociada a un estudiante' });
        }

        const cuota = await CuotaColegio.findOne({
            where: { id_cuota: req.params.id }
        });

        if (!cuota) {
            return res.status(400).json({ status: 'ERROR', message: 'Cuota no encontrada' });
        }

        await CuotaColegio.destroy({
            where: {
                id_cuota: req.params.id
            }
        });
        res.status(200).json({ status: 'OK', message: 'Cuota de colegio eliminada correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};
