import Colegio from "../models/Colegio.js";
import { decodeJWT } from "../utils/codificar.js";

export const getAllColegios = async (req, res) => {
    try {
        const colegios = await Colegio.findAll();
        res.status(200).json(colegios);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const getColegio = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        const colegio = await Colegio.findOne({
            where: {
                id_colegio: userData.id_colegio
            }
        });
        res.status(200).json(colegio);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const createColegio = async (req, res) => {
    try {
        await Colegio.create(req.body);
        res.status(200).json({ status: 'OK', message: 'Colegio creado correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const updateColegio = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        req.body.id_usuario_modifico = userData.id

        await Colegio.update(req.body, {
            where: {
                id_colegio: userData.id_colegio
            }
        });
        res.status(200).json({ status: 'OK', message: 'Colegio actualizado correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const deleteColegio = async (req, res) => {
    try {
        const colegio = await Colegio.findOne({ where: { id_colegio: req.params.id } });

        if (!colegio) {
            return res.status(400).json({ status: 'ERROR', message: 'Colegio no encontrado' });
        }

        await Colegio.destroy({
            where: {
                id_colegio: req.params.id
            }
        });
        res.status(200).json({ status: 'OK', message: 'Colegio eliminado correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};
