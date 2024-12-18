import DetalleGastoTutor from "../models/DetalleGastoTutor.js";

export const getAllDetallesGastoTutor = async (req, res) => {
    try {
        const detalles = await DetalleGastoTutor.findAll();
        res.status(200).json(detalles);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getDetalleGastoTutor = async (req, res) => {
    try {
        const detalle = await DetalleGastoTutor.findAll({
            where: {
                id_detalle: req.params.id
            }
        });
        res.status(200).json(detalle[0]);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const createDetalleGastoTutor = async (req, res) => {
    try {
        await DetalleGastoTutor.create(req.body);
        res.status(200).json({ message: 'Detalle de gasto de tutor creado correctamente!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateDetalleGastoTutor = async (req, res) => {
    try {
        await DetalleGastoTutor.update(req.body, {
            where: {
                id_detalle: req.params.id
            }
        });
        res.status(200).json({ message: 'Detalle de gasto de tutor actualizado correctamente!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteDetalleGastoTutor = async (req, res) => {
    try {
        const detalle = await DetalleGastoTutor.findOne({
            where: { id_detalle: req.params.id }
        });

        if (!detalle) {
            return res.status(400).json({ message: 'Detalle no encontrado' });
        }

        await DetalleGastoTutor.destroy({
            where: {
                id_detalle: req.params.id
            }
        });
        res.status(200).json({ message: 'Detalle de gasto de tutor eliminado correctamente!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
