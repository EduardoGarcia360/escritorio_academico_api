import EncargadoBus from "../models/EncargadoBus.js";

export const getAllEncargadosBus = async (req, res) => {
    try {
        const encargados = await EncargadoBus.findAll();
        res.status(200).json(encargados);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const getEncargadoBus = async (req, res) => {
    try {
        const encargado = await EncargadoBus.findAll({
            where: {
                id_encargado_bus: req.params.id
            }
        });
        res.status(200).json(encargado[0]);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const createEncargadoBus = async (req, res) => {
    try {
        await EncargadoBus.create(req.body);
        res.status(200).json({ status: 'OK', message: 'Encargado de bus creado correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const updateEncargadoBus = async (req, res) => {
    try {
        await EncargadoBus.update(req.body, {
            where: {
                id_encargado_bus: req.params.id
            }
        });
        res.status(200).json({ status: 'OK', message: 'Encargado de bus actualizado correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const deleteEncargadoBus = async (req, res) => {
    try {
        const encargado = await EncargadoBus.findOne({
            where: { id_encargado_bus: req.params.id }
        });

        if (!encargado) {
            return res.status(400).json({ status: 'ERROR', message: 'Encargado no encontrado' });
        }

        await EncargadoBus.destroy({
            where: {
                id_encargado_bus: req.params.id
            }
        });
        res.status(200).json({ status: 'OK', message: 'Encargado de bus eliminado correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};
