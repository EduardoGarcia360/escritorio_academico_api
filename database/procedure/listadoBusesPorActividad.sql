CREATE DEFINER=`root`@`localhost` PROCEDURE `escritorio_academico`.`listadoBusesPorActividad`(IN p_id_colegio INT,
    IN p_id_asignacion INT)
begin
	-- Listar los datos requeridos de los buses asignados a una actividad específica
    SELECT ATE.id_asignacion_transporte,
           ATE.id_asignacion,
           ATE.id_bus,
           ATE.id_docente,
           ATE.nombre_piloto,
           ATE.licencia,
           ATE.telefono_piloto,
           ATE.observaciones,
           B.matricula,
           B.capacidad,
           B.marca,
           PD.nombre_completo,
           PD.telefono
    FROM AsignacionTransporteExtra ATE
    INNER JOIN Bus B ON ATE.id_bus = B.id_bus
    INNER JOIN PersonalDocente PD ON ATE.id_docente = PD.id_docente
    WHERE B.id_colegio = p_id_colegio
      AND ATE.id_asignacion = p_id_asignacion;
END