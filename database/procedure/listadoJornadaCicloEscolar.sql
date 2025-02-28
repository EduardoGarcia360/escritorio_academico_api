CREATE DEFINER=`root`@`localhost` PROCEDURE `escritorio_academico`.`listadoJornadaCicloEscolar`(IN p_id_ciclo INT)
begin
	-- Listar las jornadas asociadas a un ciclo escolar con la descripción concatenada
    SELECT JCE.id_jornada_ciclo,
           JCE.id_jornada,
           JCE.id_ciclo,
           CONCAT(NE.nombre, ' ', J.nombre, ' (', TIME_FORMAT(J.horario_inicio, '%H:%i'), ' - ', TIME_FORMAT(J.horario_fin, '%H:%i'), ')') AS desc_jornada,
           (SELECT COUNT(*) FROM Grado G WHERE G.id_jornada_ciclo = JCE.id_jornada_ciclo) AS cantidad_grados
    FROM JornadaCicloEscolar JCE
    INNER JOIN Jornada J ON JCE.id_jornada = J.id_jornada
    INNER JOIN NivelEducacion NE ON J.id_nivel = NE.id_nivel
    WHERE JCE.id_ciclo = p_id_ciclo;
END