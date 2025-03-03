CREATE PROCEDURE escritorio_academico.miasignacioninfoactividad(IN p_id_asignacion_transporte INT)
begin
	-- Listar la información relevante a la actividad del colegio
    SELECT ATE.nombre_piloto,
           ATE.licencia,
           AGE.descripcion AS desc_info_adicional,
           AGE.fecha_asignacion,
           GE.fecha_gasto,
           GE.nombre_gasto,
           GE.monto,
           GE.descripcion AS desc_gasto
    FROM AsignacionTransporteExtra ATE
    INNER JOIN AsignacionGastoExtra AGE ON ATE.id_asignacion = AGE.id_asignacion
    INNER JOIN GastoExtraordinario GE ON AGE.id_gasto = GE.id_gasto
    WHERE ATE.id_asignacion_transporte = p_id_asignacion_transporte;
END