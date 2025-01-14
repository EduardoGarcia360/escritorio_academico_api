CREATE DEFINER=`root`@`localhost` PROCEDURE `escritorio_academico`.`listadoEstudiantesPorGrado`(IN p_id_grado INT,
    IN p_id_colegio INT)
begin
	DECLARE v_anio_ciclo INT;

    -- Obtener el año del ciclo escolar activo para el colegio
    SELECT YEAR(fecha_inicio)
    INTO v_anio_ciclo
    FROM CicloEscolar
    WHERE id_colegio = p_id_colegio AND estado = 'A';

    -- Listar todos los estudiantes asignados a un grado específico
    SELECT AEG.id_asignacion,
    		E.id_estudiante,
           E.fotografia,
           E.nombre_completo,
           E.fecha_nacimiento,
           E.identificacion,
           E.fecha_inscripcion,
           E.estado_matricula,
           (SELECT COUNT(*)
            FROM CuotaEstudiante CE
            WHERE CE.id_estudiante = E.id_estudiante
              AND LEFT(CE.periodo, 4) = v_anio_ciclo) AS cantidad_cuotas
    FROM AsignacionEstudianteGrado AEG
    INNER JOIN Estudiante E ON AEG.id_estudiante = E.id_estudiante
    WHERE AEG.id_grado = p_id_grado
      AND E.id_colegio = p_id_colegio;
END