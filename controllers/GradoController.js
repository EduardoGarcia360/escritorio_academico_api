import Grado from "../models/Grado.js";
import AsignacionEstudianteGrado from "../models/AsignacionEstudianteGrado.js";
import { decodeJWT } from "../utils/codificar.js";
import { Sequelize } from "sequelize";

export const getAllGrados = async (req, res) => {
    try {
        const grados = await Grado.findAll();
        res.status(200).json(grados);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const getAllGradosByJornadaCiclo = async (req, res) => {
    try {
        const grados = await Grado.findAll({
            where: {
                id_jornada_ciclo: req.params.id
            },
            attributes: {
                include: [
                    [
                        Sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM AsignacionEstudianteGrado AS aeg
                            WHERE aeg.id_grado = Grado.id_grado
                        )`),
                        'cantidad_estudiantes'
                    ],
                    [
                        Sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM AsignacionDocenteGrado AS adg
                            WHERE adg.id_grado = Grado.id_grado
                        )`),
                        'cantidad_maestros'
                    ]
                ]
            }
        });
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
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        req.body.id_usuario_creo = userData.id

        await Grado.create(req.body);
        res.status(200).json({ status: 'OK', message: 'Grado creado correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const updateGrado = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        req.body.id_usuario_modifico = userData.id

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

        const asignacion = await AsignacionEstudianteGrado.findOne({
            where: { id_grado: req.params.id }
        })

        if (asignacion) {
            return res.status(400).json({ status: 'ERROR', message: 'Grado asociado a una asignación' });
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
