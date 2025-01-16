CREATE DEFINER=`root`@`localhost` PROCEDURE `escritorio_academico`.`listadoActividadesPorGrado`(IN p_id_colegio INT,
    IN p_id_grado INT)
begin
	-- Listar los gastos extraordinarios asignados a un grado específico
    SELECT AGE.id_asignacion,
           AGE.id_gasto,
           AGE.monto,
           AGE.descripcion,
           AGE.fecha_asignacion,
           GE.nombre_gasto,
           GE.es_actividad_bus,
           (
           	select COUNT(1)
           	from AsignacionTransporteExtra ate
           	where ate.id_asignacion = AGE.id_asignacion
           ) cantidad_buses
    FROM AsignacionGastoExtra AGE
    INNER JOIN GastoExtraordinario GE ON AGE.id_gasto = GE.id_gasto
    WHERE GE.id_colegio = p_id_colegio
      AND AGE.id_grado = p_id_grado;
END