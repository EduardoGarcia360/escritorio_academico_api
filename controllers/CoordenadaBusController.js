import CoordenadaBus from "../models/CoordenadaBus.js";

export const getAllCoordenadasBus = async (req, res) => {
    try {
        const coordenadas = await CoordenadaBus.findAll();
        res.status(200).json(coordenadas);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const getCoordenadaBus = async (req, res) => {
    try {
        const coordenada = await CoordenadaBus.findAll({
            where: {
                id_coordenada: req.params.id
            }
        });
        res.status(200).json(coordenada[0]);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const createCoordenadaBus = async (req, res) => {
    try {
        await CoordenadaBus.create(req.body);
        res.status(200).json({ status: 'OK', message: 'Coordenada de bus creada correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const updateCoordenadaBus = async (req, res) => {
    try {
        await CoordenadaBus.update(req.body, {
            where: {
                id_coordenada: req.params.id
            }
        });
        res.status(200).json({ status: 'OK', message: 'Coordenada de bus actualizada correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const deleteCoordenadaBus = async (req, res) => {
    try {
        const coordenada = await CoordenadaBus.findOne({
            where: { id_coordenada: req.params.id }
        });

        if (!coordenada) {
            return res.status(400).json({ status: 'ERROR', message: 'Coordenada no encontrada' });
        }

        await CoordenadaBus.destroy({
            where: {
                id_coordenada: req.params.id
            }
        });
        res.status(200).json({ status: 'OK', message: 'Coordenada de bus eliminada correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};
