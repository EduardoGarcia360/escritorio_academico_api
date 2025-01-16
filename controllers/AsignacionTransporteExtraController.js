import AsignacionTransporteExtra from "../models/AsignacionTransporteExtra.js";

export const getAllAsignacionesTransporteExtra = async (req, res) => {
    try {
        const asignaciones = await AsignacionTransporteExtra.findAll();
        res.status(200).json(asignaciones);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAsignacionTransporteExtra = async (req, res) => {
    try {
        const asignacion = await AsignacionTransporteExtra.findOne({
            where: {
                id_asignacion_transporte: req.params.id
            }
        });

        if (!asignacion) {
            return res.status(404).json({ message: 'Asignación de transporte extra no encontrada' });
        }

        res.status(200).json(asignacion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const createAsignacionTransporteExtra = async (req, res) => {
    try {
        const nuevaAsignacion = await AsignacionTransporteExtra.create(req.body);
        res.status(200).json({ message: 'Asignación de transporte extra creada correctamente!', asignacion: nuevaAsignacion });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateAsignacionTransporteExtra = async (req, res) => {
    try {
        const [updated] = await AsignacionTransporteExtra.update(req.body, {
            where: {
                id_asignacion_transporte: req.params.id
            }
        });

        if (updated) {
            const asignacionActualizada = await AsignacionTransporteExtra.findOne({
                where: { id_asignacion_transporte: req.params.id }
            });
            return res.status(200).json({ message: 'Asignación de transporte extra actualizada correctamente!', asignacion: asignacionActualizada });
        }

        return res.status(404).json({ message: 'Asignación de transporte extra no encontrada' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteAsignacionTransporteExtra = async (req, res) => {
    try {
        const asignacion = await AsignacionTransporteExtra.findOne({
            where: { id_asignacion_transporte: req.params.id }
        });

        if (!asignacion) {
            return res.status(404).json({ message: 'Asignación de transporte extra no encontrada' });
        }

        await AsignacionTransporteExtra.destroy({
            where: {
                id_asignacion_transporte: req.params.id
            }
        });

        res.status(200).json({ message: 'Asignación de transporte extra eliminada correctamente!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
