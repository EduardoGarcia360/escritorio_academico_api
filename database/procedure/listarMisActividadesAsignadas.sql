CREATE DEFINER=`root`@`localhost` PROCEDURE `escritorio_academico`.`listarMisActividadesAsignadas`(
IN p_id_colegio INT,
    IN p_id_docente INT
)
begin
	-- Listar las actividades asignadas a un docente
    SELECT ATE.id_asignacion_transporte,
           ATE.id_asignacion,
           ATE.id_bus,
           ATE.id_docente,
           ATE.nombre_piloto,
           ATE.licencia,
           ATE.telefono_piloto,
           ATE.observaciones,
           ATE.id_usuario_creo,
           ATE.id_usuario_modifico,
           ATE.createdAt,
           B.matricula,
           B.marca,
           B.color,
           RH.tipo_registro,
           RH.createdAt AS hora_finalizado,
           ATE.estado
    FROM AsignacionTransporteExtra ATE
    INNER JOIN Bus B ON ATE.id_bus = B.id_bus
    LEFT JOIN RegistroHorarioBus RH ON ATE.id_asignacion_transporte = RH.id_asignacion_transporte AND RH.estado = 'F'
    WHERE B.id_colegio = p_id_colegio
      AND ATE.id_docente = p_id_docente;
END