import CryptoJS from "crypto-js";

/**
 * Middleware para cifrar la respuesta de la API
 */
const encryptResponse = (req, res, next) => {
    // Sobrescribe el método `res.json`
    const originalJson = res.json;

    res.json = function (data) {
        try {
            // Convertir los datos en JSON y cifrarlos
            const jsonString = JSON.stringify(data);
            const encryptedData = CryptoJS.AES.encrypt(jsonString, process.env.CRYPTO_JS).toString();

            // Retornar la respuesta cifrada
            originalJson.call(this, { payload: encryptedData });
        } catch (error) {
            console.error("Error al cifrar la respuesta:", error);
            originalJson.call(this, {
                status: "ERROR",
                message: "Error al procesar la respuesta",
            });
        }
    };

    next();
};

export default encryptResponse;
