import PagoCuota from "../models/PagoCuota.js";
import CuotaEstudiante from "../models/CuotaEstudiante.js";
import { decodeJWT } from "../utils/codificar.js";

export const getAllPagosCuota = async (req, res) => {
    try {
        const pagos = await PagoCuota.findAll();
        res.status(200).json(pagos);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const getPagoCuotaByCuotaEstudiante = async (req, res) => {
    try {
        const pagos = await PagoCuota.findOne({
            where: {
                id_cuota_estudiante: req.params.id
            }
        })
        res.status(200).json(pagos);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const getPagoCuota = async (req, res) => {
    try {
        const pago = await PagoCuota.findAll({
            where: {
                id_pago: req.params.id
            }
        });
        res.status(200).json(pago[0]);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const createPagoCuota = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        req.body.id_usuario_creo = userData.id;

        await PagoCuota.create(req.body);

        // se cambia el estado de la cuota a pagado
        await CuotaEstudiante.update({ estado: 'G' }, {
            where: {
                id_cuota_estudiante: req.body.id_cuota_estudiante
            }
        });

        res.status(200).json({ status: 'OK', message: 'Pago registrado correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const updatePagoCuota = async (req, res) => {
    try {
        await PagoCuota.update(req.body, {
            where: {
                id_pago: req.params.id
            }
        });
        res.status(200).json({ status: 'OK', message: 'Pago actualizado correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const deletePagoCuota = async (req, res) => {
    try {
        const pago = await PagoCuota.findOne({
            where: { id_pago: req.params.id }
        });

        if (!pago) {
            return res.status(400).json({ status: 'ERROR', message: 'Pago no encontrado' });
        }

        await PagoCuota.destroy({
            where: {
                id_pago: req.params.id
            }
        });
        res.status(200).json({ status: 'OK', message: 'Pago eliminado correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};
