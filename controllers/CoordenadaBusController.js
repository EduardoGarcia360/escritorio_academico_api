import CoordenadaBus from "../models/CoordenadaBus.js";
import { decodeJWT } from "../utils/codificar.js";

export const getAllCoordenadasBus = async (req, res) => {
    try {
        const coordenadas = await CoordenadaBus.findAll();
        res.status(200).json(coordenadas);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllCoordenadasBusByTransporte = async (req, res) => {
    try {
        const coordenadas = await CoordenadaBus.findAll({
            where: {
                id_asignacion_transporte: req.params.id
            }
        });
        res.status(200).json(coordenadas);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getCoordenadaBus = async (req, res) => {
    try {
        const coordenada = await CoordenadaBus.findOne({
            where: {
                id_coordenada: req.params.id
            }
        });

        if (!coordenada) {
            return res.status(400).json({ message: 'Coordenada no encontrada' });
        }

        res.status(200).json(coordenada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const createCoordenadaBus = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        req.body.id_usuario_creo = userData.id;
        
        const nuevaCoordenada = await CoordenadaBus.create(req.body);
        res.status(200).json({ message: 'Coordenada creada correctamente!', coordenada: nuevaCoordenada });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateCoordenadaBus = async (req, res) => {
    try {
        const [updated] = await CoordenadaBus.update(req.body, {
            where: {
                id_coordenada: req.params.id
            }
        });

        if (updated) {
            const coordenadaActualizada = await CoordenadaBus.findOne({
                where: { id_coordenada: req.params.id }
            });
            return res.status(200).json({ message: 'Coordenada actualizada correctamente!', coordenada: coordenadaActualizada });
        }

        return res.status(400).json({ message: 'Coordenada no encontrada' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteCoordenadaBus = async (req, res) => {
    try {
        const coordenada = await CoordenadaBus.findOne({
            where: { id_coordenada: req.params.id }
        });

        if (!coordenada) {
            return res.status(400).json({ message: 'Coordenada no encontrada' });
        }

        await CoordenadaBus.destroy({
            where: {
                id_coordenada: req.params.id
            }
        });

        res.status(200).json({ message: 'Coordenada eliminada correctamente!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
