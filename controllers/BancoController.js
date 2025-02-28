import Banco from "../models/Banco.js";
import { decodeJWT } from "../utils/codificar.js";

export const getAllBancos = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        const bancos = await Banco.findAll({
            where: {
                id_colegio: userData.id_colegio
            }
        });
        res.status(200).json(bancos);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getBanco = async (req, res) => {
    try {
        const banco = await Banco.findOne({
            where: {
                id_banco: req.params.id
            }
        });

        if (!banco) {
            return res.status(400).json({ message: 'Banco no encontrado' });
        }

        res.status(200).json(banco);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const createBanco = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        // Asignar los valores del usuario que creó el tutor
        req.body.id_usuario_creo = userData.id;
        req.body.id_colegio = userData.id_colegio;

        await Banco.create(req.body);
        res.status(200).json({ message: 'Banco creado correctamente!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateBanco = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        req.body.id_usuario_modifico = userData.id
        
        const [updated] = await Banco.update(req.body, {
            where: {
                id_banco: req.params.id
            }
        });

        if (updated) {
            await Banco.findOne({ where: { id_banco: req.params.id } });
            return res.status(200).json({ message: 'Banco actualizado correctamente!' });
        }

        return res.status(400).json({ message: 'Banco no encontrado' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteBanco = async (req, res) => {
    try {
        const banco = await Banco.findOne({
            where: { id_banco: req.params.id }
        });

        if (!banco) {
            return res.status(400).json({ message: 'Banco no encontrado' });
        }

        await Banco.destroy({
            where: {
                id_banco: req.params.id
            }
        });

        res.status(200).json({ message: 'Banco eliminado correctamente!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
