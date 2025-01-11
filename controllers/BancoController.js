import Banco from "../models/Banco.js";

export const getAllBancos = async (req, res) => {
    try {
        const bancos = await Banco.findAll();
        res.status(200).json(bancos);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getBanco = async (req, res) => {
    try {
        const banco = await Banco.findOne({
            where: {
                id_banco: req.params.id
            }
        });

        if (!banco) {
            return res.status(404).json({ message: 'Banco no encontrado' });
        }

        res.status(200).json(banco);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const createBanco = async (req, res) => {
    try {
        await Banco.create(req.body);
        res.status(200).json({ message: 'Banco creado correctamente!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateBanco = async (req, res) => {
    try {
        const [updated] = await Banco.update(req.body, {
            where: {
                id_banco: req.params.id
            }
        });

        if (updated) {
            await Banco.findOne({ where: { id_banco: req.params.id } });
            return res.status(200).json({ message: 'Banco actualizado correctamente!' });
        }

        return res.status(404).json({ message: 'Banco no encontrado' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteBanco = async (req, res) => {
    try {
        const banco = await Banco.findOne({
            where: { id_banco: req.params.id }
        });

        if (!banco) {
            return res.status(404).json({ message: 'Banco no encontrado' });
        }

        await Banco.destroy({
            where: {
                id_banco: req.params.id
            }
        });

        res.status(200).json({ message: 'Banco eliminado correctamente!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
