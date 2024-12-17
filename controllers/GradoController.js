import Grado from "../models/Grado.js";

export const getAllGrados = async (req, res) => {
    try {
        const grados = await Grado.findAll();
        res.status(200).json(grados);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getGrado = async (req, res) => {
    try {
        const grado = await Grado.findAll({
            where: {
                id_grado: req.params.id
            }
        });
        res.status(200).json(grado[0]);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const createGrado = async (req, res) => {
    try {
        await Grado.create(req.body);
        res.status(200).json({ message: 'Grado creado correctamente!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateGrado = async (req, res) => {
    try {
        await Grado.update(req.body, {
            where: {
                id_grado: req.params.id
            }
        });
        res.status(200).json({ message: 'Grado actualizado correctamente!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteGrado = async (req, res) => {
    try {
        const grado = await Grado.findOne({
            where: { id_grado: req.params.id }
        });

        if (!grado) {
            return res.status(400).json({ message: 'Grado no encontrado' });
        }

        await Grado.destroy({
            where: {
                id_grado: req.params.id
            }
        });
        res.status(200).json({ message: 'Grado eliminado correctamente!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
