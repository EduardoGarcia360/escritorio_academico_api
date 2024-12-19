import ActividadBus from "../models/ActividadBus.js";

export const getAllActividadesBus = async (req, res) => {
    try {
        const actividades = await ActividadBus.findAll();
        res.status(200).json(actividades);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const getActividadBus = async (req, res) => {
    try {
        const actividad = await ActividadBus.findAll({
            where: {
                id_actividad: req.params.id
            }
        });
        res.status(200).json(actividad[0]);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const createActividadBus = async (req, res) => {
    try {
        await ActividadBus.create(req.body);
        res.status(200).json({ status: 'OK', message: 'Actividad de bus creada correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const updateActividadBus = async (req, res) => {
    try {
        await ActividadBus.update(req.body, {
            where: {
                id_actividad: req.params.id
            }
        });
        res.status(200).json({ status: 'OK', message: 'Actividad de bus actualizada correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const deleteActividadBus = async (req, res) => {
    try {
        const actividad = await ActividadBus.findOne({
            where: { id_actividad: req.params.id }
        });

        if (!actividad) {
            return res.status(400).json({ status: 'ERROR', message: 'Actividad no encontrada' });
        }

        await ActividadBus.destroy({
            where: {
                id_actividad: req.params.id
            }
        });
        res.status(200).json({ status: 'OK', message: 'Actividad de bus eliminada correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};
