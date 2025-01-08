CREATE PROCEDURE escritorio_academico.listadoJornadaColegio(IN p_id_colegio INT, IN p_id_ciclo INT)
begin
	-- Listar las jornadas asociadas a un colegio con la descripción concatenada
    SELECT J.id_jornada,
           CONCAT(NE.nombre, ' ', J.nombre, ' (', TIME_FORMAT(J.horario_inicio, '%H:%i'), ' - ', TIME_FORMAT(J.horario_fin, '%H:%i'), ')') AS desc_jornada
    FROM Jornada J
    INNER JOIN NivelEducacion NE ON J.id_nivel = NE.id_nivel
    LEFT JOIN JornadaCicloEscolar JCE ON J.id_jornada = JCE.id_jornada AND JCE.id_ciclo = p_id_ciclo
    WHERE NE.id_colegio = p_id_colegio
      AND JCE.id_jornada IS NULL
    ORDER BY NE.nombre, J.nombre;
END