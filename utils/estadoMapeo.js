// Mapeo de estado a descripciones
const estadoDescriptions = {
    A: "Activo",
    I: "Inactivo",
};

// Función para obtener la descripción
export const getEstadoDescription = (estado) => {
    return estadoDescriptions[estado] || "Desconocido";
};
