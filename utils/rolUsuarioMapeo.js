// Mapeo de roles a descripciones
const roleDescriptions = {
    A: "Administrador",
    D: "Docente",
    E: "Estudiante",
    O: "Otro",
    P: "Padre de Familia",
};

// Función para obtener la descripción
export const getRoleDescription = (role) => {
    return roleDescriptions[role] || "Desconocido";
};
