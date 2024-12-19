import Tutor from "../models/Tutor.js";

export const getAllTutores = async (req, res) => {
    try {
        const tutores = await Tutor.findAll();
        res.status(200).json(tutores);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const getTutor = async (req, res) => {
    try {
        const tutor = await Tutor.findAll({
            where: {
                id_tutor: req.params.id
            }
        });
        res.status(200).json(tutor[0]);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const createTutor = async (req, res) => {
    try {
        await Tutor.create(req.body);
        res.status(200).json({ status: 'OK', message: 'Tutor creado correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const updateTutor = async (req, res) => {
    try {
        await Tutor.update(req.body, {
            where: {
                id_tutor: req.params.id
            }
        });
        res.status(200).json({ status: 'OK', message: 'Tutor actualizado correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const deleteTutor = async (req, res) => {
    try {
        const tutor = await Tutor.findOne({
            where: { id_tutor: req.params.id }
        });

        if (!tutor) {
            return res.status(400).json({ status: 'ERROR', message: 'Tutor no encontrado' });
        }

        await Tutor.destroy({
            where: {
                id_tutor: req.params.id
            }
        });
        res.status(200).json({ status: 'OK', message: 'Tutor eliminado correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};
