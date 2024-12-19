import GastoExtraordinario from "../models/GastoExtraordinario.js";

export const getAllGastosExtraordinarios = async (req, res) => {
    try {
        const gastos = await GastoExtraordinario.findAll();
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
        await GastoExtraordinario.create(req.body);
        res.status(200).json({ status: 'OK', message: 'Gasto extraordinario creado correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const updateGastoExtraordinario = async (req, res) => {
    try {
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
