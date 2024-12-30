import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

export const descifrarObjeto = (encryptedPayload) => {
    // console.log('process.env.CRYPTO_JS', process.env.CRYPTO_JS)
    const SECRET_KEY = process.env.CRYPTO_JS;

    const bytes = CryptoJS.AES.decrypt(encryptedPayload, SECRET_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    try {
        return JSON.parse(decryptedData);
    } catch (error) {
        throw new Error("Error al descifrar los datos: el formato no es válido.");
    }
};

export const decodeJWT = (token) => {
    try {
        if (!token) {
            return null; // Retorna null si no hay token
        }

        // Decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded; // Retorna el contenido del token decodificado
    } catch (error) {
        return null; // Retorna null si el token es inválido
    }
};
