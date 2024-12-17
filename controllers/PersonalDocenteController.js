import PersonalDocente from "../models/PersonalDocente.js";

export const getAllPersonalDocente = async (req, res) => {
    try {
        const personalDocente = await PersonalDocente.findAll();
        res.status(200).json(personalDocente);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getPersonalDocente = async (req, res) => {
    try {
        const docente = await PersonalDocente.findAll({
            where: {
                id_docente: req.params.id
            }
        });
        res.status(200).json(docente[0]);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const createPersonalDocente = async (req, res) => {
    try {
        await PersonalDocente.create(req.body);
        res.status(200).json({ message: 'Personal docente creado correctamente!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updatePersonalDocente = async (req, res) => {
    try {
        await PersonalDocente.update(req.body, {
            where: {
                id_docente: req.params.id
            }
        });
        res.status(200).json({ message: 'Personal docente actualizado correctamente!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deletePersonalDocente = async (req, res) => {
    try {
        const docente = await PersonalDocente.findOne({
            where: { id_docente: req.params.id }
        });

        if (!docente) {
            return res.status(400).json({ message: 'Personal docente no encontrado' });
        }

        await PersonalDocente.destroy({
            where: {
                id_docente: req.params.id
            }
        });
        res.status(200).json({ message: 'Personal docente eliminado correctamente!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
