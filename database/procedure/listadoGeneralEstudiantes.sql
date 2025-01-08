CREATE DEFINER=`root`@`localhost` PROCEDURE `escritorio_academico`.`listadoGeneralEstudiantes`(
	IN p_id_colegio INT
)
begin
	-- Listar todos los estudiantes con su asignación (si la tienen) en el colegio especificado
    SELECT E.id_estudiante,
           E.nombre_completo,
           E.fecha_nacimiento,
           E.direccion,
           E.telefono_contacto,
           E.estado_matricula,
           E.fotografia,
           E.identificacion,
           E.codigo_estudiante,
           COALESCE(J.horario_inicio, '') AS jornada_inicio,
           COALESCE(J.horario_fin, '') AS jornada_fin,
           COALESCE(G.nombre, '') AS grado,
           COALESCE(G.seccion, '') AS seccion,
           (SELECT COUNT(*) FROM TutorEstudiante TE WHERE TE.id_estudiante = E.id_estudiante) AS cantidad_tutores
    FROM Estudiante E
    LEFT JOIN AsignacionEstudianteGrado AEG ON E.id_estudiante = AEG.id_estudiante
    LEFT JOIN Grado G ON AEG.id_grado = G.id_grado
    LEFT JOIN JornadaCicloEscolar JCE ON G.id_jornada_ciclo = JCE.id_jornada_ciclo
    LEFT JOIN Jornada J ON JCE.id_jornada = J.id_jornada
    WHERE E.id_colegio = p_id_colegio
    ORDER BY 
        CASE WHEN AEG.id_asignacion IS NULL THEN 0 ELSE 1 END,  -- No asignados primero
        E.nombre_completo,                                    -- Nombre alfabéticamente (no asignados)
        J.horario_inicio,                                     -- Jornada alfabéticamente (asignados)
        G.nombre,                                             -- Grado alfabéticamente (asignados)
        E.nombre_completo;                                    -- Nombre alfabéticamente (asignados)
END