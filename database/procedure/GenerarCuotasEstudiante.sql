CREATE DEFINER=`root`@`localhost` PROCEDURE `escritorio_academico`.`GenerarCuotasEstudiante`(
    IN p_id_estudiante INT,
    IN p_id_colegio INT,
    IN p_id_usuario_accion INT
)
BEGIN
    DECLARE v_id_ciclo INT;
    DECLARE v_fecha_inicio DATE;
    DECLARE v_fecha_fin DATE;
    DECLARE v_id_cuota INT;
    DECLARE v_monto DECIMAL(10,2);
   	DECLARE v_nombre_ciclo VARCHAR(50);

    -- Obtener el ciclo escolar activo para el colegio indicado
    SELECT id_ciclo, fecha_inicio, fecha_fin, nombre
    INTO v_id_ciclo, v_fecha_inicio, v_fecha_fin, v_nombre_ciclo
    FROM CicloEscolar
    WHERE id_colegio = p_id_colegio AND estado = 'A';

    -- Verificar si se encontró un ciclo escolar activo
    IF v_id_ciclo IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No hay ciclo escolar activo para el colegio indicado';
    END IF;

    -- Obtener la cuota mensual más reciente para el colegio indicado
    SELECT id_cuota, monto
    INTO v_id_cuota, v_monto
    FROM CuotaColegio
    WHERE id_colegio = p_id_colegio
    ORDER BY createdAt DESC
    LIMIT 1;

    -- Verificar si se encontró una cuota
    IF v_id_cuota IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No se encontró una cuota activa para el colegio indicado';
    END IF;

    -- Generar las cuotas mensuales para el estudiante
    WHILE v_fecha_inicio <= v_fecha_fin DO
        INSERT INTO CuotaEstudiante (
            id_cuota, id_estudiante, periodo, monto, estado, fecha_vencimiento, id_usuario_creo, createdAt
        )
        VALUES (
            v_id_cuota,
            p_id_estudiante,
            DATE_FORMAT(v_fecha_inicio, '%Y-%m'),
            v_monto,
            'P',
            LAST_DAY(v_fecha_inicio),
            p_id_usuario_accion,
            NOW()
        );

        -- Incrementar al siguiente mes
        SET v_fecha_inicio = DATE_ADD(v_fecha_inicio, INTERVAL 1 MONTH);
    END WHILE;
   
   	-- Mensaje de proceso finalizado exitosamente
    SELECT CONCAT('Cuotas generadas exitosamente para el período: ', v_nombre_ciclo) AS mensaje_final;
END