import CuotaEstudiante from "../models/CuotaEstudiante.js";
import CicloEscolar from "../models/CicloEscolar.js";
import { Op } from "sequelize";
import { extraerCaracteres } from "../utils/utils.js";

export const getAllCuotasEstudiante = async (req, res) => {
    try {
        // Obtener el ciclo escolar activo
        const cicloActivo = await CicloEscolar.findOne({
            where: { estado: 'A' },
            attributes: ['fecha_inicio'] // Obtener fecha de inicio del ciclo escolar
        });

        if (!cicloActivo) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'No hay un ciclo escolar activo'
            });
        }
// console.log('CICLO ACTIVO', cicloActivo)
console.log('CICLO ACTIVO2', cicloActivo.fecha_inicio)
        // Extraer el año de la fecha de inicio del ciclo escolar
        const anioInicial = extraerCaracteres(cicloActivo.fecha_inicio, 4);
console.log('ANIO INICIAL', anioInicial)
        // Filtrar las cuotas por estudiante y periodo dentro del año del ciclo activo
        const cuotas = await CuotaEstudiante.findAll({
            where: {
                id_estudiante: req.params.id,
                periodo: {
                    [Op.like]: `${anioInicial}-%` // Validar que el periodo comience con el año del ciclo escolar activo
                }
            }
        });

        res.status(200).json(cuotas);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
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
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const createCuotaEstudiante = async (req, res) => {
    try {
        await CuotaEstudiante.create(req.body);
        res.status(200).json({ status: 'OK', message: 'Cuota de estudiante creada correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const updateCuotaEstudiante = async (req, res) => {
    try {
        await CuotaEstudiante.update(req.body, {
            where: {
                id_cuota_estudiante: req.params.id
            }
        });
        res.status(200).json({ status: 'OK', message: 'Cuota de estudiante actualizada correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const deleteCuotaEstudiante = async (req, res) => {
    try {
        const cuota = await CuotaEstudiante.findOne({
            where: { id_cuota_estudiante: req.params.id }
        });

        if (!cuota) {
            return res.status(400).json({ status: 'ERROR', message: 'Cuota no encontrada' });
        }

        await CuotaEstudiante.destroy({
            where: {
                id_cuota_estudiante: req.params.id
            }
        });
        res.status(200).json({ status: 'OK', message: 'Cuota de estudiante eliminada correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};
