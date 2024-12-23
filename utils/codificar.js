import CryptoJS from "crypto-js";

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
