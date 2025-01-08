import NivelEducacion from "../models/NivelEducacion.js";
import Jornada from "../models/Jornada.js";
import { decodeJWT } from "../utils/codificar.js";
import { Sequelize } from "sequelize";

export const getAllNivelesEducacion = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        // Obtener los niveles de educación junto con el contador de jornadas
        const nivelesEducacion = await NivelEducacion.findAll({
            where: {
                id_colegio: userData.id_colegio
            },
            attributes: {
                include: [
                    // Subconsulta para contar las jornadas asociadas
                    [
                        Sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM Jornada AS j
                            WHERE j.id_nivel = NivelEducacion.id_nivel
                        )`),
                        'cantidad_jornada'
                    ]
                ]
            }
        });

        res.status(200).json(nivelesEducacion);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const getNivelEducacion = async (req, res) => {
    try {
        const nivelEducacion = await NivelEducacion.findAll({
            where: {
                id_nivel: req.params.id
            }
        });
        res.status(200).json(nivelEducacion[0]);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const createNivelEducacion = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        req.body.id_colegio = userData.id_colegio
        req.body.id_usuario_creo = userData.id

        await NivelEducacion.create(req.body);
        res.status(200).json({ status: 'OK', message: 'Nivel de educación creado correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const updateNivelEducacion = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        req.body.id_usuario_modifico = userData.id

        await NivelEducacion.update(req.body, {
            where: {
                id_nivel: req.params.id
            }
        });
        res.status(200).json({ status: 'OK', message: 'Nivel de educación actualizado correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const deleteNivelEducacion = async (req, res) => {
    try {
        const nivelEducacion = await NivelEducacion.findOne({ where: { id_nivel: req.params.id } });

        if (!nivelEducacion) {
            return res.status(400).json({ status: 'ERROR', message: 'Nivel de educación no encontrado' });
        }

        const jornada = await Jornada.findOne({ where: { id_nivel: req.params.id }})

        if (jornada) {
            return res.status(400).json({ status: 'ERROR', message: 'Nivel de Educación asociado a una Jornada' });
        }

        await NivelEducacion.destroy({
            where: {
                id_nivel: req.params.id
            }
        });
        res.status(200).json({ status: 'OK', message: 'Nivel de educación eliminado correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};
