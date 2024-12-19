import TutorEstudiante from "../models/TutorEstudiante.js";

export const getAllTutorEstudiantes = async (req, res) => {
    try {
        const relaciones = await TutorEstudiante.findAll();
        res.status(200).json(relaciones);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const getTutorEstudiante = async (req, res) => {
    try {
        const relacion = await TutorEstudiante.findAll({
            where: {
                id_relacion: req.params.id
            }
        });
        res.status(200).json(relacion[0]);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const createTutorEstudiante = async (req, res) => {
    try {
        await TutorEstudiante.create(req.body);
        res.status(200).json({ status: 'OK', message: 'Relación tutor-estudiante creada correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const updateTutorEstudiante = async (req, res) => {
    try {
        await TutorEstudiante.update(req.body, {
            where: {
                id_relacion: req.params.id
            }
        });
        res.status(200).json({ status: 'OK', message: 'Relación tutor-estudiante actualizada correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const deleteTutorEstudiante = async (req, res) => {
    try {
        const relacion = await TutorEstudiante.findOne({
            where: { id_relacion: req.params.id }
        });

        if (!relacion) {
            return res.status(400).json({ status: 'ERROR', message: 'Relación no encontrada' });
        }

        await TutorEstudiante.destroy({
            where: {
                id_relacion: req.params.id
            }
        });
        res.status(200).json({ status: 'OK', message: 'Relación tutor-estudiante eliminada correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};
