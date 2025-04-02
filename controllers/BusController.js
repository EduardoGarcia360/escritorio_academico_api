import Bus from "../models/Bus.js";
import { decodeJWT } from "../utils/codificar.js";

export const getAllBuses = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        const buses = await Bus.findAll({
            where: {
                id_colegio: userData.id_colegio
            }
        });
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
            return res.status(400).json({ message: 'Bus no encontrado' });
        }

        res.status(200).json(bus);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const createBus = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        const seguridad = { id_usuario_creo: userData.id, id_colegio: userData.id_colegio }
        req.body = { ...req.body, ...seguridad }
        // console.log('req.body BUS', JSON.stringify(req.body));

        const nuevoBus = await Bus.create(req.body);
        res.status(200).json({ message: 'Bus creado correctamente!', bus: nuevoBus });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateBus = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        req.body.id_usuario_modifico = userData.id
        
        const [updated] = await Bus.update(req.body, {
            where: {
                id_bus: req.params.id
            }
        });

        if (updated) {
            const busActualizado = await Bus.findOne({ where: { id_bus: req.params.id } });
            return res.status(200).json({ message: 'Bus actualizado correctamente!', bus: busActualizado });
        }

        return res.status(400).json({ message: 'Bus no encontrado' });
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
            return res.status(400).json({ message: 'Bus no encontrado' });
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
