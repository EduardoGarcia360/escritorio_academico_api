import UsuarioTutor from "../models/UsuarioTutor.js";

export const getAllUsuariosTutores = async (req, res) => {
    try {
        const usuariosTutores = await UsuarioTutor.findAll();
        res.status(200).json(usuariosTutores);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getUsuarioTutor = async (req, res) => {
    try {
        const usuarioTutor = await UsuarioTutor.findOne({
            where: {
                id_usuario_tutor: req.params.id
            }
        });

        if (!usuarioTutor) {
            return res.status(400).json({ message: 'Usuario-Tutor no encontrado' });
        }

        res.status(200).json(usuarioTutor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const createUsuarioTutor = async (req, res) => {
    try {
        const nuevoUsuarioTutor = await UsuarioTutor.create(req.body);
        res.status(200).json({ message: 'Usuario-Tutor creado correctamente!', usuarioTutor: nuevoUsuarioTutor });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateUsuarioTutor = async (req, res) => {
    try {
        const [updated] = await UsuarioTutor.update(req.body, {
            where: {
                id_usuario_tutor: req.params.id
            }
        });

        if (updated) {
            const usuarioTutorActualizado = await UsuarioTutor.findOne({ where: { id_usuario_tutor: req.params.id } });
            return res.status(200).json({ message: 'Usuario-Tutor actualizado correctamente!', usuarioTutor: usuarioTutorActualizado });
        }

        return res.status(400).json({ message: 'Usuario-Tutor no encontrado' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteUsuarioTutor = async (req, res) => {
    try {
        const usuarioTutor = await UsuarioTutor.findOne({
            where: { id_usuario_tutor: req.params.id }
        });

        if (!usuarioTutor) {
            return res.status(400).json({ message: 'Usuario-Tutor no encontrado' });
        }

        await UsuarioTutor.destroy({
            where: {
                id_usuario_tutor: req.params.id
            }
        });

        res.status(200).json({ message: 'Usuario-Tutor eliminado correctamente!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
