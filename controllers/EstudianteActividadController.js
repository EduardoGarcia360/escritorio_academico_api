import EstudianteActividad from "../models/EstudianteActividad.js";

export const getAllEstudiantesActividades = async (req, res) => {
    try {
        const estudiantesActividades = await EstudianteActividad.findAll();
        res.status(200).json(estudiantesActividades);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const getEstudianteActividad = async (req, res) => {
    try {
        const estudianteActividad = await EstudianteActividad.findAll({
            where: {
                id_estudiante_actividad: req.params.id
            }
        });
        res.status(200).json(estudianteActividad[0]);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const createEstudianteActividad = async (req, res) => {
    try {
        await EstudianteActividad.create(req.body);
        res.status(200).json({ status: 'OK', message: 'Actividad de estudiante creada correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const updateEstudianteActividad = async (req, res) => {
    try {
        await EstudianteActividad.update(req.body, {
            where: {
                id_estudiante_actividad: req.params.id
            }
        });
        res.status(200).json({ status: 'OK', message: 'Actividad de estudiante actualizada correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const deleteEstudianteActividad = async (req, res) => {
    try {
        const estudianteActividad = await EstudianteActividad.findOne({
            where: { id_estudiante_actividad: req.params.id }
        });

        if (!estudianteActividad) {
            return res.status(400).json({ status: 'ERROR', message: 'Actividad no encontrada' });
        }

        await EstudianteActividad.destroy({
            where: {
                id_estudiante_actividad: req.params.id
            }
        });
        res.status(200).json({ status: 'OK', message: 'Actividad de estudiante eliminada correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};
