import RegistroHorarioBus from "../models/RegistroHorarioBus.js";

export const getAllRegistrosHorarioBus = async (req, res) => {
    try {
        const registros = await RegistroHorarioBus.findAll();
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
            return res.status(404).json({ message: 'Registro de horario no encontrado' });
        }

        res.status(200).json(registro);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const createRegistroHorarioBus = async (req, res) => {
    try {
        const nuevoRegistro = await RegistroHorarioBus.create(req.body);
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

        return res.status(404).json({ message: 'Registro de horario no encontrado' });
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
            return res.status(404).json({ message: 'Registro de horario no encontrado' });
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
