export const getAllSecciones = async (req, res) => {
    try {
        const secciones = [
            { nombre: 'A' },
            { nombre: 'B' },
            { nombre: 'C' },
            { nombre: 'D' },
        ]
        res.status(200).json(secciones);
    } catch (error) {
        res.status(400).json({ status: 'ERROR', message: error.message });
    }
};