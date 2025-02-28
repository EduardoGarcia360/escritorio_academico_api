import PersonalDocente from "../models/PersonalDocente.js";
import AsignacionDocenteGrado from "../models/AsignacionDocenteGrado.js";
import { decodeJWT } from "../utils/codificar.js";

export const getAllPersonalDocente = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        const personalDocente = await PersonalDocente.findAll({
            where: {
                id_colegio: userData.id_colegio
            }
        });
        res.status(200).json(personalDocente);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
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
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const createPersonalDocente = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        req.body.correo_electronico = !req.body.correo_electronico ? null : req.body.correo_electronico
        req.body.id_usuario_creo = userData.id
        req.body.id_colegio = userData.id_colegio

        await PersonalDocente.create(req.body);
        res.status(200).json({ status: 'OK', message: 'Personal docente creado correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const updatePersonalDocente = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        req.body.correo_electronico = !req.body.correo_electronico ? null : req.body.correo_electronico
        req.body.id_usuario_modifico = userData.id
        req.body.id_colegio = userData.id_colegio

        await PersonalDocente.update(req.body, {
            where: {
                id_docente: req.params.id
            }
        });
        res.status(200).json({ status: 'OK', message: 'Personal docente actualizado correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const deletePersonalDocente = async (req, res) => {
    try {
        const docente = await PersonalDocente.findOne({
            where: { id_docente: req.params.id }
        });

        if (!docente) {
            return res.status(400).json({ status: 'ERROR', message: 'Personal docente no encontrado' });
        }

        const asignacion = await AsignacionDocenteGrado.findOne({
            where: { id_docente: req.params.id }
        })

        if (asignacion) {
            return res.status(400).json({ status: 'ERROR', message: 'Personal docente asignado a un grado' });
        }

        await PersonalDocente.destroy({
            where: {
                id_docente: req.params.id
            }
        });
        res.status(200).json({ status: 'OK', message: 'Personal docente eliminado correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};
