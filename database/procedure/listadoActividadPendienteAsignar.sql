CREATE DEFINER=`root`@`localhost` PROCEDURE `escritorio_academico`.`listadoActividadPendienteAsignar`(IN p_id_colegio INT,
    IN p_id_grado INT)
begin
	-- Listar las actividades que no están asignadas a un grado específico
    SELECT GE.id_gasto,
           CONCAT(GE.nombre_gasto, ' (', GE.monto, ' - ', DATE_FORMAT(GE.fecha_gasto, '%Y-%m-%d'), ')') AS desc_actividad,
           GE.monto
    FROM GastoExtraordinario GE
    LEFT JOIN AsignacionGastoExtra AGE ON GE.id_gasto = AGE.id_gasto AND AGE.id_grado = p_id_grado
    WHERE GE.id_colegio = p_id_colegio
      AND AGE.id_asignacion IS NULL;
END