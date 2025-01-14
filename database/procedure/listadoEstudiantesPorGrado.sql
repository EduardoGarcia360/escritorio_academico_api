CREATE DEFINER=`root`@`localhost` PROCEDURE `escritorio_academico`.`listadoEstudiantesPorGrado`(IN p_id_grado INT,
    IN p_id_colegio INT)
begin
	-- Listar todos los estudiantes asignados a un grado específico
    SELECT AEG.id_asignacion,
    		E.id_estudiante,
           E.fotografia,
           E.nombre_completo,
           E.fecha_nacimiento,
           E.identificacion,
           E.fecha_inscripcion,
           E.estado_matricula
    FROM AsignacionEstudianteGrado AEG
    INNER JOIN Estudiante E ON AEG.id_estudiante = E.id_estudiante
    WHERE AEG.id_grado = p_id_grado
      AND E.id_colegio = p_id_colegio;
END