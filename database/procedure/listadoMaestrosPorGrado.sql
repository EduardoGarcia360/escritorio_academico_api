CREATE DEFINER=`root`@`localhost` PROCEDURE `escritorio_academico`.`listadoMaestrosPorGrado`(IN p_id_colegio INT,
    IN p_id_grado INT)
begin
	-- Listar todos los maestros asignados a un grado específico
    SELECT ADG.id_asignacion,
    		PD.id_docente,
           PD.codigo_empleado,
           PD.nombre_completo,
           PD.identificacion,
           PD.estado_empleo,
           ADG.rol_docente,
           ADG.fecha_asignacion
    FROM AsignacionDocenteGrado ADG
    INNER JOIN PersonalDocente PD ON ADG.id_docente = PD.id_docente
    WHERE PD.id_colegio = p_id_colegio
      AND ADG.id_grado = p_id_grado;
END