CREATE DEFINER=`root`@`localhost` PROCEDURE `escritorio_academico`.`estadocuentaestudiante`(IN p_id_colegio INT,
    IN p_id_usuario_tutor INT, in p_id_estudiante INT)
begin
	 DECLARE v_anio_ciclo INT;

    -- Obtener el año del ciclo escolar activo
    SELECT YEAR(fecha_inicio)
    INTO v_anio_ciclo
    FROM CicloEscolar
    WHERE id_colegio = p_id_colegio AND estado = 'A';

    -- Validar si existe un ciclo escolar activo
    IF v_anio_ciclo IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No hay ciclo escolar activo para el colegio indicado';
    END IF;

    -- Listar las cuotas y su estado asociadas a un estudiante del tutor especificado
    SELECT CE.id_cuota_estudiante,
           CE.id_cuota,
           CE.id_estudiante,
           CE.periodo,
           CE.monto,
           CE.estado,
           CE.fecha_vencimiento,
           PC.monto_pagado,
           PC.fecha_pago,
           PC.numero_boleta,
           PC.fecha_boleta
    FROM CuotaEstudiante CE
    LEFT JOIN PagoCuota PC ON CE.id_cuota_estudiante = PC.id_cuota_estudiante
    INNER JOIN TutorEstudiante TE ON CE.id_estudiante = TE.id_estudiante
    INNER JOIN Tutor T ON TE.id_tutor = T.id_tutor
    INNER JOIN UsuarioTutor UT ON T.id_tutor = UT.id_tutor
    WHERE UT.id_usuario = p_id_usuario_tutor
      AND CE.id_estudiante = p_id_estudiante
      AND LEFT(CE.periodo, 4) = v_anio_ciclo;
END