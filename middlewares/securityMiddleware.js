import { descifrarObjeto } from '../utils/codificar.js';

export const decryptPayload = (req, res, next) => {
    try {
        if (req.body?.payload) {
            // console.log('payload', req.body?.payload)
            const decryptedData = descifrarObjeto(req.body.payload);
            req.body = decryptedData;
        }
        next();
    } catch (error) {
        return res.status(400).json({ status: 'ERROR', message: "Error al descifrar los datos: " + error.message });
    }
};