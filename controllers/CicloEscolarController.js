import CicloEscolar from "../models/CicloEscolar.js";
import { decodeJWT } from "../utils/codificar.js";
import { Sequelize } from "sequelize";

export const getAllCiclosEscolares = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        // Obtener los ciclos escolares junto con el contador de jornadas asociadas
        const ciclosEscolares = await CicloEscolar.findAll({
            where: {
                id_colegio: userData.id_colegio
            },
            attributes: {
                include: [
                    // Subconsulta para contar las jornadas asociadas
                    [
                        Sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM JornadaCicloEscolar AS jce
                            WHERE jce.id_ciclo = CicloEscolar.id_ciclo
                        )`),
                        'cantidad_jornadas'
                    ]
                ]
            }
        });

        res.status(200).json(ciclosEscolares);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const getCicloEscolar = async (req, res) => {
    try {
        const cicloEscolar = await CicloEscolar.findAll({
            where: {
                id_ciclo: req.params.id
            }
        });
        res.status(200).json(cicloEscolar[0]);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const getCicloEscolarVigente = async (req, res) => {
    try {
        const cicloEscolar = await CicloEscolar.findOne({
            where: {
                estado: 'A'
            }
        });
        res.status(200).json(cicloEscolar);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const createCicloEscolar = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        // Buscar si ya existe un ciclo escolar activo
        const cicloActivo = await CicloEscolar.findOne({
            where: {
                estado: 'A'
            }
        });

        if (cicloActivo) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'Ya existe un ciclo escolar activo. No se puede crear otro.'
            });
        }

        req.body.id_colegio = userData.id_colegio
        req.body.id_usuario_creo = userData.id

        // Crear el nuevo ciclo escolar
        await CicloEscolar.create(req.body);
        res.status(200).json({ status: 'OK', message: 'Ciclo escolar creado correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const updateCicloEscolar = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const userData = decodeJWT(token);

        if (!userData) {
            return res.status(403).json({ status: 'ERROR', message: "Token inválido o no proporcionado" });
        }

        const cicloEscolar = await CicloEscolar.findOne({ where: { id_ciclo: req.params.id } });

        if (!cicloEscolar) {
            return res.status(400).json({ status: 'ERROR', message: 'Ciclo escolar no encontrado' });
        }

        req.body.id_usuario_modifico = userData.id
        
        await CicloEscolar.update(req.body, {
            where: {
                id_ciclo: req.params.id
            }
        });
        res.status(200).json({ status: 'OK', message: 'Ciclo escolar actualizado correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};

export const deleteCicloEscolar = async (req, res) => {
    try {
        const cicloEscolar = await CicloEscolar.findOne({ where: { id_ciclo: req.params.id } });

        if (!cicloEscolar) {
            return res.status(400).json({ status: 'ERROR', message: 'Ciclo escolar no encontrado' });
        }

        await CicloEscolar.destroy({
            where: {
                id_ciclo: req.params.id
            }
        });
        res.status(200).json({ status: 'OK', message: 'Ciclo escolar eliminado correctamente!' });
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};
