import CuentaBancariaColegio from "../models/CuentaBancariaColegio.js";
import Banco from "../models/Banco.js";
import { decodeJWT } from "../utils/codificar.js";

export const getAllCuentasBancariasColegio = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        // Obtener las cuentas bancarias junto con el nombre del banco
        const cuentas = await CuentaBancariaColegio.findAll({
            where: {
                id_colegio: userData.id_colegio
            },
            include: [
                {
                    model: Banco,
                    attributes: ['nombre_banco'], // Incluir solo el nombre del banco
                }
            ]
        });

        // Mapear las cuentas para mover `nombre_banco` al nivel principal
        const cuentasConNombreBanco = cuentas.map((cuenta) => {
            const cuentaData = cuenta.toJSON();
            cuentaData.nombre_banco = cuentaData.Banco?.nombre_banco || null; // Agregar el nombre del banco al nivel principal
            delete cuentaData.Banco; // Eliminar el objeto Banco si no es necesario
            return cuentaData;
        });

        res.status(200).json(cuentasConNombreBanco);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getCuentaBancariaColegio = async (req, res) => {
    try {
        const cuenta = await CuentaBancariaColegio.findOne({
            where: {
                id_cuenta_colegio: req.params.id
            }
        });

        if (!cuenta) {
            return res.status(400).json({ message: 'Cuenta bancaria no encontrada' });
        }

        res.status(200).json(cuenta);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const createCuentaBancariaColegio = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        // Asignar los valores del usuario que creó el tutor
        req.body.id_usuario_creo = userData.id;
        req.body.id_colegio = userData.id_colegio;

        const nuevaCuenta = await CuentaBancariaColegio.create(req.body);
        res.status(200).json({ message: 'Cuenta bancaria creada correctamente!', cuenta: nuevaCuenta });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateCuentaBancariaColegio = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        req.body.id_usuario_modifico = userData.id

        const [updated] = await CuentaBancariaColegio.update(req.body, {
            where: {
                id_cuenta_colegio: req.params.id
            }
        });

        if (updated) {
            const cuentaActualizada = await CuentaBancariaColegio.findOne({ where: { id_cuenta_colegio: req.params.id } });
            return res.status(200).json({ message: 'Cuenta bancaria actualizada correctamente!', cuenta: cuentaActualizada });
        }

        return res.status(400).json({ message: 'Cuenta bancaria no encontrada' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteCuentaBancariaColegio = async (req, res) => {
    try {
        const cuenta = await CuentaBancariaColegio.findOne({
            where: { id_cuenta_colegio: req.params.id }
        });

        if (!cuenta) {
            return res.status(400).json({ message: 'Cuenta bancaria no encontrada' });
        }

        await CuentaBancariaColegio.destroy({
            where: {
                id_cuenta_colegio: req.params.id
            }
        });

        res.status(200).json({ message: 'Cuenta bancaria eliminada correctamente!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
