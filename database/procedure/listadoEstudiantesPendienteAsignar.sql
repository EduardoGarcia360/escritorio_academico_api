CREATE PROCEDURE listadoEstudiantesPendienteAsignar(
IN p_id_colegio INT)
BEGIN
	-- Listar los estudiantes que no están asignados a ningún grado
    SELECT E.id_estudiante,
           CONCAT(E.nombre_completo, ' (', E.identificacion, ')') AS desc_estudiante
    FROM Estudiante E
    LEFT JOIN AsignacionEstudianteGrado AEG ON E.id_estudiante = AEG.id_estudiante
    WHERE E.id_colegio = p_id_colegio
      AND AEG.id_asignacion IS NULL;
END