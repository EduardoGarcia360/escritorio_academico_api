import db from '../database/db.js'

export const executeStoredProcedure = async (req, res) => {
    const { procedureName, params } = req.body;

    // Validar los datos de entrada
    if (!procedureName) {
        return res.status(400).json({ message: 'El nombre del procedimiento es obligatorio.' });
    }

    try {
        // Crear la lista de parámetros para el procedimiento
        const placeholders = params && params.length ? params.map(() => '?').join(', ') : '';
        const query = `CALL ${procedureName}(${placeholders})`;

        // Ejecutar el procedimiento almacenado usando Sequelize
        const results = await db.query(query, {
            replacements: params || [],
            type: db.QueryTypes.RAW
        });

        res.status(200).json({
            message: 'Procedimiento ejecutado correctamente.',
            results,
            status: 'OK',
        });
    } catch (error) {
        console.error('Error ejecutando el procedimiento almacenado:', error.original);
        const errorMessage = error.original?.sqlMessage || error.message || 'Error desconocido';
        res.status(500).json({
            message: errorMessage,
            error: 'Error ejecutando el procedimiento almacenado.',
            status: 'ERROR'
        });
    }
};
