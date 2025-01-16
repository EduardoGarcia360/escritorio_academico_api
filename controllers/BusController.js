import Bus from "../models/Bus.js";

export const getAllBuses = async (req, res) => {
    try {
        const buses = await Bus.findAll();
        res.status(200).json(buses);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getBus = async (req, res) => {
    try {
        const bus = await Bus.findOne({
            where: {
                id_bus: req.params.id
            }
        });

        if (!bus) {
            return res.status(404).json({ message: 'Bus no encontrado' });
        }

        res.status(200).json(bus);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const createBus = async (req, res) => {
    try {
        const nuevoBus = await Bus.create(req.body);
        res.status(200).json({ message: 'Bus creado correctamente!', bus: nuevoBus });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateBus = async (req, res) => {
    try {
        const [updated] = await Bus.update(req.body, {
            where: {
                id_bus: req.params.id
            }
        });

        if (updated) {
            const busActualizado = await Bus.findOne({ where: { id_bus: req.params.id } });
            return res.status(200).json({ message: 'Bus actualizado correctamente!', bus: busActualizado });
        }

        return res.status(404).json({ message: 'Bus no encontrado' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteBus = async (req, res) => {
    try {
        const bus = await Bus.findOne({
            where: { id_bus: req.params.id }
        });

        if (!bus) {
            return res.status(404).json({ message: 'Bus no encontrado' });
        }

        await Bus.destroy({
            where: {
                id_bus: req.params.id
            }
        });

        res.status(200).json({ message: 'Bus eliminado correctamente!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
