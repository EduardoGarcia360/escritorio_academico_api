import GastoExtraordinario from "../models/GastoExtraordinario.js";
import { decodeJWT } from "../utils/codificar.js";

export const getAllGastosExtraordinarios = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        const gastos = await GastoExtraordinario.findAll({
            where: {
                id_colegio: userData.id_colegio
            }
        });
        res.status(200).json(gastos);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const getGastoExtraordinario = async (req, res) => {
    try {
        const gasto = await GastoExtraordinario.findAll({
            where: {
                id_gasto: req.params.id
            }
        });
        res.status(200).json(gasto[0]);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const createGastoExtraordinario = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        req.body.id_usuario_creo = userData.id;
        req.body.id_colegio = userData.id_colegio

        await GastoExtraordinario.create(req.body);
        res.status(200).json({ status: 'OK', message: 'Gasto extraordinario creado correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const updateGastoExtraordinario = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        req.body.id_usuario_modifico = userData.id

        await GastoExtraordinario.update(req.body, {
            where: {
                id_gasto: req.params.id
            }
        });
        res.status(200).json({ status: 'OK', message: 'Gasto extraordinario actualizado correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const deleteGastoExtraordinario = async (req, res) => {
    try {
        const gasto = await GastoExtraordinario.findOne({
            where: { id_gasto: req.params.id }
        });

        if (!gasto) {
            return res.status(400).json({ status: 'ERROR', message: 'Gasto no encontrado' });
        }

        await GastoExtraordinario.destroy({
            where: {
                id_gasto: req.params.id
            }
        });
        res.status(200).json({ status: 'OK', message: 'Gasto extraordinario eliminado correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};
