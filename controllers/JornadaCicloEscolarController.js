import JornadaCicloEscolar from "../models/JornadaCicloEscolar.js";

export const getAllJornadasCicloEscolar = async (req, res) => {
    try {
        const jornadasCicloEscolar = await JornadaCicloEscolar.findAll();
        res.status(200).json(jornadasCicloEscolar);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getJornadaCicloEscolar = async (req, res) => {
    try {
        const jornadaCicloEscolar = await JornadaCicloEscolar.findAll({
            where: {
                id_jornada_ciclo: req.params.id
            }
        });
        res.status(200).json(jornadaCicloEscolar[0]);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const createJornadaCicloEscolar = async (req, res) => {
    try {
        await JornadaCicloEscolar.create(req.body);
        res.status(200).json({ message: 'Jornada ciclo escolar creada correctamente!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateJornadaCicloEscolar = async (req, res) => {
    try {
        await JornadaCicloEscolar.update(req.body, {
            where: {
                id_jornada_ciclo: req.params.id
            }
        });
        res.status(200).json({ message: 'Jornada ciclo escolar actualizada correctamente!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteJornadaCicloEscolar = async (req, res) => {
    try {
        const jornadaCicloEscolar = await JornadaCicloEscolar.findOne({
            where: { id_jornada_ciclo: req.params.id }
        });

        if (!jornadaCicloEscolar) {
            return res.status(400).json({ message: 'Jornada ciclo escolar no encontrada' });
        }

        await JornadaCicloEscolar.destroy({
            where: {
                id_jornada_ciclo: req.params.id
            }
        });
        res.status(200).json({ message: 'Jornada ciclo escolar eliminada correctamente!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
