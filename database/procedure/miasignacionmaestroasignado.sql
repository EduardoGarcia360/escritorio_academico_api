CREATE PROCEDURE escritorio_academico.miasignacionmaestroasignado(IN p_id_asignacion_transporte INT)
begin
	-- Obtener la información del maestro asignado a una actividad de transporte
    SELECT PD.nombre_completo,
           PD.codigo_empleado,
           PD.especialidad
    FROM AsignacionTransporteExtra ATE
    INNER JOIN PersonalDocente PD ON ATE.id_docente = PD.id_docente
    WHERE ATE.id_asignacion_transporte = p_id_asignacion_transporte;
END