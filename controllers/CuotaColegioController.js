import CuotaColegio from "../models/CuotaColegio.js";

export const getAllCuotasColegio = async (req, res) => {
    try {
        const cuotas = await CuotaColegio.findAll();
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
        await CuotaColegio.create(req.body);
        res.status(200).json({ status: 'OK', message: 'Cuota de colegio creada correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const updateCuotaColegio = async (req, res) => {
    try {
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
