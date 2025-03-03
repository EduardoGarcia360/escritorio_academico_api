import RegistroHorarioBus from "../models/RegistroHorarioBus.js";
import AsignacionTransporteExtra from "../models/AsignacionTransporteExtra.js";
import { decodeJWT } from "../utils/codificar.js"

export const getAllRegistrosHorarioBus = async (req, res) => {
    try {
        const registros = await RegistroHorarioBus.findAll({
            where: {
                id_asignacion_transporte: req.params.id
            }
        });
        res.status(200).json(registros);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getRegistroHorarioBus = async (req, res) => {
    try {
        const registro = await RegistroHorarioBus.findOne({
            where: {
                id_registro_horario: req.params.id
            }
        });

        if (!registro) {
            return res.status(400).json({ message: 'Registro de horario no encontrado' });
        }

        res.status(200).json(registro);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const createRegistroHorarioBus = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        req.body.id_usuario_creo = userData.id

        const nuevoRegistro = await RegistroHorarioBus.create(req.body);

        if (req.body.estado === 'F') {
            // si finaliza la actividad tambien se finaliza la asignacion
            const updateFields = {
                estado: 'F',
                id_usuario_modifico: userData.id
            }
            const updated = await AsignacionTransporteExtra.update(updateFields, {
                where: {
                    id_asignacion_transporte: req.body.id_asignacion_transporte
                }
            });
        }
        res.status(200).json({ message: 'Registro de horario creado correctamente!', registro: nuevoRegistro });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateRegistroHorarioBus = async (req, res) => {
    try {
        const [updated] = await RegistroHorarioBus.update(req.body, {
            where: {
                id_registro_horario: req.params.id
            }
        });

        if (updated) {
            const registroActualizado = await RegistroHorarioBus.findOne({ where: { id_registro_horario: req.params.id } });
            return res.status(200).json({ message: 'Registro de horario actualizado correctamente!', registro: registroActualizado });
        }

        return res.status(400).json({ message: 'Registro de horario no encontrado' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteRegistroHorarioBus = async (req, res) => {
    try {
        const registro = await RegistroHorarioBus.findOne({
            where: { id_registro_horario: req.params.id }
        });

        if (!registro) {
            return res.status(400).json({ message: 'Registro de horario no encontrado' });
        }

        await RegistroHorarioBus.destroy({
            where: {
                id_registro_horario: req.params.id
            }
        });

        res.status(200).json({ message: 'Registro de horario eliminado correctamente!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
