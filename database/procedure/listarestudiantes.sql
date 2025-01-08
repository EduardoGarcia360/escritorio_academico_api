CREATE DEFINER=`root`@`localhost` PROCEDURE `escritorio_academico`.`listarestudiantes`(
	IN p_id_colegio INT,
    IN p_id_jornada INT,
    IN p_id_grado INT,
    IN p_seccion VARCHAR(10)
)
begin
	-- Declarar variables locales
    DECLARE v_id_ciclo INT;

    -- Obtener el ciclo escolar activo para el colegio
    SELECT id_ciclo
    INTO v_id_ciclo
    FROM CicloEscolar
    WHERE id_colegio = p_id_colegio AND estado = 'A';

    -- Verificar si existe un ciclo escolar activo
    IF v_id_ciclo IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No hay ciclo escolar activo para el colegio indicado';
    END IF;
    
    -- SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Probando mensaje';

    -- Listar estudiantes según los filtros indicados
    SELECT E.id_estudiante,
           E.nombre_completo,
           E.fecha_nacimiento,
           E.direccion,
           E.telefono_contacto,
           E.estado_matricula,
           E.fotografia,
           E.identificacion,
           E.codigo_estudiante,
           COALESCE(G.nombre, 'Sin grado asignado') AS grado,
           COALESCE(G.seccion, 'Sin sección asignada') AS seccion
    FROM Estudiante E
    INNER JOIN AsignacionEstudianteGrado AEG ON E.id_estudiante = AEG.id_estudiante
    LEFT JOIN Grado G ON AEG.id_grado = G.id_grado
    LEFT JOIN JornadaCicloEscolar JCE ON G.id_jornada_ciclo = JCE.id_jornada_ciclo AND JCE.id_ciclo = v_id_ciclo
    LEFT JOIN Jornada J ON JCE.id_jornada = J.id_jornada
    WHERE E.id_colegio = p_id_colegio
      AND (p_id_jornada IS NULL OR J.id_jornada = p_id_jornada)
      AND (p_id_grado IS NULL OR G.id_grado = p_id_grado)
      AND (p_seccion IS NULL OR G.seccion = p_seccion)
    ORDER BY E.nombre_completo;
END