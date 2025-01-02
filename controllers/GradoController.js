import Grado from "../models/Grado.js";
import JornadaCicloEscolar from "../models/JornadaCicloEscolar.js";
import CicloEscolar from "../models/CicloEscolar.js";

export const getAllGrados = async (req, res) => {
    try {
        const grados = await Grado.findAll();
        res.status(200).json(grados);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
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
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const createGrado = async (req, res) => {
    try {
        await Grado.create(req.body);
        res.status(200).json({ status: 'OK', message: 'Grado creado correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const updateGrado = async (req, res) => {
    try {
        await Grado.update(req.body, {
            where: {
                id_grado: req.params.id
            }
        });
        res.status(200).json({ status: 'OK', message: 'Grado actualizado correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const deleteGrado = async (req, res) => {
    try {
        const grado = await Grado.findOne({
            where: { id_grado: req.params.id }
        });

        if (!grado) {
            return res.status(400).json({ status: 'ERROR', message: 'Grado no encontrado' });
        }

        await Grado.destroy({
            where: {
                id_grado: req.params.id
            }
        });
        res.status(200).json({ status: 'OK', message: 'Grado eliminado correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const getGradoByJornada = async (req, res) => {
    try {
        const { id } = req.params; // ID de la jornada seleccionada

        // Obtener el ciclo escolar activo
        const cicloActivo = await CicloEscolar.findOne({
            where: { estado: 'A' }
        });

        if (!cicloActivo) {
            return res.status(404).json({ status: 'ERROR', message: 'No hay un ciclo escolar activo.' });
        }

        // Obtener la asociación jornada-ciclo escolar
        const jornadaCiclo = await JornadaCicloEscolar.findOne({
            where: {
                id_jornada: id,
                id_ciclo: cicloActivo.id_ciclo
            }
        });

        if (!jornadaCiclo) {
            return res.status(404).json({ status: 'ERROR', message: 'No se encontró una asociación válida para la jornada y ciclo escolar activo.' });
        }

        // Obtener los grados asociados a la jornada-ciclo
        const grados = await Grado.findAll({
            where: {
                id_jornada_ciclo: jornadaCiclo.id_jornada_ciclo
            }
        });

        res.status(200).json(grados);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};
