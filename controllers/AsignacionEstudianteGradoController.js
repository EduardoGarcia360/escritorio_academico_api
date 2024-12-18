import AsignacionEstudianteGrado from "../models/AsignacionEstudianteGrado.js";

export const getAllAsignacionesEstudianteGrado = async (req, res) => {
    try {
        const asignaciones = await AsignacionEstudianteGrado.findAll();
        res.status(200).json(asignaciones);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAsignacionEstudianteGrado = async (req, res) => {
    try {
        const asignacion = await AsignacionEstudianteGrado.findAll({
            where: {
                id_asignacion: req.params.id
            }
        });
        res.status(200).json(asignacion[0]);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const createAsignacionEstudianteGrado = async (req, res) => {
    try {
        await AsignacionEstudianteGrado.create(req.body);
        res.status(200).json({ message: 'Asignación de estudiante a grado creada correctamente!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateAsignacionEstudianteGrado = async (req, res) => {
    try {
        await AsignacionEstudianteGrado.update(req.body, {
            where: {
                id_asignacion: req.params.id
            }
        });
        res.status(200).json({ message: 'Asignación de estudiante a grado actualizada correctamente!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteAsignacionEstudianteGrado = async (req, res) => {
    try {
        const asignacion = await AsignacionEstudianteGrado.findOne({
            where: { id_asignacion: req.params.id }
        });

        if (!asignacion) {
            return res.status(400).json({ message: 'Asignación no encontrada' });
        }

        await AsignacionEstudianteGrado.destroy({
            where: {
                id_asignacion: req.params.id
            }
        });
        res.status(200).json({ message: 'Asignación eliminada correctamente!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
