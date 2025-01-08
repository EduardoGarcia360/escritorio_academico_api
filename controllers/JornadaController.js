import Jornada from "../models/Jornada.js";
import JornadaCicloEscolar from "../models/JornadaCicloEscolar.js";
import { decodeJWT } from "../utils/codificar.js";

export const getAllJornadas = async (req, res) => {
    try {
        const jornadas = await Jornada.findAll();
        res.status(200).json(jornadas);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const getJornada = async (req, res) => {
    try {
        const jornada = await Jornada.findAll({
            where: {
                id_jornada: req.params.id
            }
        });
        res.status(200).json(jornada[0]);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const getJornadaByNivelEducacion = async (req, res) => {
    try {
        const jornada = await Jornada.findAll({
            where: {
                id_nivel: req.params.id
            }
        });
        res.status(200).json(jornada);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const createJornada = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        req.body.id_usuario_creo = userData.id

        await Jornada.create(req.body);
        res.status(200).json({ status: 'OK', message: 'Jornada creada correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const updateJornada = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        req.body.id_usuario_modifico = userData.id

        await Jornada.update(req.body, {
            where: {
                id_jornada: req.params.id
            }
        });
        res.status(200).json({ status: 'OK', message: 'Jornada actualizada correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const deleteJornada = async (req, res) => {
    try {
        const jornada = await Jornada.findOne({ where: { id_jornada: req.params.id } });

        if (!jornada) {
            return res.status(400).json({ status: 'ERROR', message: 'Jornada no encontrada' });
        }

        const jornadaCiclo = await JornadaCicloEscolar.findOne({ where: { id_jornada: req.params.id }})

        if (jornadaCiclo) {
            return res.status(400).json({ status: 'ERROR', message: 'Jornada asociada a un ciclo escolar' });
        }

        await Jornada.destroy({
            where: {
                id_jornada: req.params.id
            }
        });
        res.status(200).json({ status: 'OK', message: 'Jornada eliminada correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};
