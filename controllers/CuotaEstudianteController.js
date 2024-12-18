import CuotaEstudiante from "../models/CuotaEstudiante.js";

export const getAllCuotasEstudiante = async (req, res) => {
    try {
        const cuotas = await CuotaEstudiante.findAll();
        res.status(200).json(cuotas);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getCuotaEstudiante = async (req, res) => {
    try {
        const cuota = await CuotaEstudiante.findAll({
            where: {
                id_cuota_estudiante: req.params.id
            }
        });
        res.status(200).json(cuota[0]);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const createCuotaEstudiante = async (req, res) => {
    try {
        await CuotaEstudiante.create(req.body);
        res.status(200).json({ message: 'Cuota de estudiante creada correctamente!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateCuotaEstudiante = async (req, res) => {
    try {
        await CuotaEstudiante.update(req.body, {
            where: {
                id_cuota_estudiante: req.params.id
            }
        });
        res.status(200).json({ message: 'Cuota de estudiante actualizada correctamente!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteCuotaEstudiante = async (req, res) => {
    try {
        const cuota = await CuotaEstudiante.findOne({
            where: { id_cuota_estudiante: req.params.id }
        });

        if (!cuota) {
            return res.status(400).json({ message: 'Cuota no encontrada' });
        }

        await CuotaEstudiante.destroy({
            where: {
                id_cuota_estudiante: req.params.id
            }
        });
        res.status(200).json({ message: 'Cuota de estudiante eliminada correctamente!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
