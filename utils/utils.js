export const extraerCaracteres = (cadena, cantidad) => {
    if (typeof cadena !== 'string' || typeof cantidad !== 'number' || cantidad < 0) {
        return null; // Retorna null si los parámetros no son válidos
    }
    return cadena.substring(0, cantidad);
};