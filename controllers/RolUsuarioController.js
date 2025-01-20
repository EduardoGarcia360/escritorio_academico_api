export const getAllRolUsuario = async (req, res) => {
    try {
        const roles = [
            { nombre: 'Administrador', valor: 'A' },
            { nombre: 'Docente', valor: 'D' },
            { nombre: 'Estudiante', valor: 'E' },
            { nombre: 'Otro', valor: 'O' },
        ]
        res.status(200).json(roles);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};