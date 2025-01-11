import CuentaBancariaColegio from "../models/CuentaBancariaColegio.js";

export const getAllCuentasBancariasColegio = async (req, res) => {
    try {
        const cuentas = await CuentaBancariaColegio.findAll();
        res.status(200).json(cuentas);
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
            return res.status(404).json({ message: 'Cuenta bancaria no encontrada' });
        }

        res.status(200).json(cuenta);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const createCuentaBancariaColegio = async (req, res) => {
    try {
        const nuevaCuenta = await CuentaBancariaColegio.create(req.body);
        res.status(200).json({ message: 'Cuenta bancaria creada correctamente!', cuenta: nuevaCuenta });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateCuentaBancariaColegio = async (req, res) => {
    try {
        const [updated] = await CuentaBancariaColegio.update(req.body, {
            where: {
                id_cuenta_colegio: req.params.id
            }
        });

        if (updated) {
            const cuentaActualizada = await CuentaBancariaColegio.findOne({ where: { id_cuenta_colegio: req.params.id } });
            return res.status(200).json({ message: 'Cuenta bancaria actualizada correctamente!', cuenta: cuentaActualizada });
        }

        return res.status(404).json({ message: 'Cuenta bancaria no encontrada' });
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
            return res.status(404).json({ message: 'Cuenta bancaria no encontrada' });
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
