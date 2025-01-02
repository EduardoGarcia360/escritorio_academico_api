import db from "../database/db.js";
import { decodeJWT } from "../utils/codificar.js";

export const executeStoredProcedure = async (req, res) => {
  const { procedureName, objParams, params } = req.body;

  const token = req.cookies?.token;
  const userData = decodeJWT(token);

  if (!userData) {
    return res
      .status(403)
      .json({ status: "ERROR", message: "Token inválido o no proporcionado" });
  }

  // Validar los datos de entrada
  if (!procedureName) {
    return res
      .status(400)
      .json({ message: "El nombre del procedimiento es obligatorio." });
  }
  if (!objParams || typeof objParams !== "object") {
    return res
      .status(400)
      .json({
        message:
          "El objeto de parámetros es obligatorio y debe ser un objeto válido.",
      });
  }
  if (!Array.isArray(params)) {
    return res
      .status(400)
      .json({
        message:
          "El arreglo de parámetros es obligatorio y debe ser un arreglo válido.",
      });
  }

  try {
    // Mapear los valores de objParams en el orden definido por params
    const newObjParams = {...objParams, ...userData}
    // console.log('newObjParams', newObjParams)
    const mappedParams = params.map(param => !newObjParams[param] ? null : newObjParams[param]);

    // Crear la lista de placeholders para el procedimiento
    const placeholders = mappedParams.map(() => "?").join(", ");
    const query = `CALL ${procedureName}(${placeholders})`;

    // Ejecutar el procedimiento almacenado usando Sequelize
    const results = await db.query(query, {
      replacements: mappedParams,
      type: db.QueryTypes.RAW,
    });

    res.status(200).json({
      message: "Procedimiento ejecutado correctamente.",
      results,
      status: "OK",
    });
  } catch (error) {
    console.error(
      "Error ejecutando el procedimiento almacenado:",
      error.original
    );
    const errorMessage =
      error.original?.sqlMessage || error.message || "Error desconocido";
    res.status(500).json({
      message: errorMessage,
      error: "Error ejecutando el procedimiento almacenado.",
      status: "ERROR",
    });
  }
};
