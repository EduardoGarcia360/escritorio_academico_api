import Usuario from "../models/Usuario.js";

export const getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll()
        res.status(200).json(usuarios)
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message })
    }
}

export const getUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findAll({
            where: {
                id_usuario: req.params.id
            }
        });
        res.status(200).json(usuario[0]);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const createUsuario = async (req, res) => {
    try {
        await Usuario.create(req.body);
        res.status(200).json({ status: 'OK', message: 'Usuario creado correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const updateUsuario = async (req, res) => {
    try {
        await Usuario.update(req.body, {
            where: {
                id_usuario: req.params.id
            }
        });
        res.status(200).json({ status: 'OK', message: 'Usuario actualizado correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const deleteUsuario = async (req, res) => {
    try {
        // Buscar el registro que se desea eliminar
        const usuario = await Usuario.findOne({ where: { id_usuario: req.params.id } });

        if (!usuario) {
            return res.status(400).json({ status: 'ERROR', message: 'Registro no encontrado' });
        }

        await Usuario.destroy({
            where: {
                id_usuario: req.params.id
            }
        })
        res.status(200).json({ status: 'OK', message: 'Registro eliminado correctamente!' })
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message })
    }
}