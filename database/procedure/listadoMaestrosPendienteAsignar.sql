CREATE DEFINER=`root`@`localhost` PROCEDURE `escritorio_academico`.`listadoMaestrosPendienteAsignar`(IN p_id_colegio INT,
    IN p_id_grado INT)
begin
	-- Listar los maestros que no están asignados a un grado específico
    SELECT PD.id_docente,
           CONCAT(PD.nombre_completo, ' (', PD.identificacion, ')') AS desc_maestro
    FROM PersonalDocente PD
    LEFT JOIN AsignacionDocenteGrado ADG ON PD.id_docente = ADG.id_docente AND ADG.id_grado = p_id_grado
    WHERE PD.id_colegio = p_id_colegio
      AND ADG.id_asignacion IS NULL;
END