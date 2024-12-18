import PagoCuota from "../models/PagoCuota.js";

export const getAllPagosCuota = async (req, res) => {
    try {
        const pagos = await PagoCuota.findAll();
        res.status(200).json(pagos);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getPagoCuota = async (req, res) => {
    try {
        const pago = await PagoCuota.findAll({
            where: {
                id_pago: req.params.id
            }
        });
        res.status(200).json(pago[0]);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const createPagoCuota = async (req, res) => {
    try {
        await PagoCuota.create(req.body);
        res.status(200).json({ message: 'Pago registrado correctamente!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updatePagoCuota = async (req, res) => {
    try {
        await PagoCuota.update(req.body, {
            where: {
                id_pago: req.params.id
            }
        });
        res.status(200).json({ message: 'Pago actualizado correctamente!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deletePagoCuota = async (req, res) => {
    try {
        const pago = await PagoCuota.findOne({
            where: { id_pago: req.params.id }
        });

        if (!pago) {
            return res.status(400).json({ message: 'Pago no encontrado' });
        }

        await PagoCuota.destroy({
            where: {
                id_pago: req.params.id
            }
        });
        res.status(200).json({ message: 'Pago eliminado correctamente!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
