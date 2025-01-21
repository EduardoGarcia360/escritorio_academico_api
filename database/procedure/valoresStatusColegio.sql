CREATE PROCEDURE escritorio_academico.valoresStatusColegio(IN p_id_colegio INT)
begin
	DECLARE v_nombre_ciclo VARCHAR(100);
    DECLARE v_anio_ciclo INT;
    DECLARE v_estudiantes_inscritos VARCHAR(255);
    DECLARE v_docentes_activos VARCHAR(255);
    DECLARE v_ptje_cuotas_pagadas VARCHAR(255);
    DECLARE v_actividades_mes VARCHAR(255);

    -- Obtener el nombre y año del ciclo escolar vigente
    SELECT nombre, YEAR(fecha_inicio)
    INTO v_nombre_ciclo, v_anio_ciclo
    FROM CicloEscolar
    WHERE id_colegio = p_id_colegio AND estado = 'A';

    -- Validar si existe un ciclo escolar vigente
    IF v_nombre_ciclo IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No hay ciclo escolar activo para el colegio indicado';
    END IF;

    -- Estudiantes inscritos
    SELECT CONCAT(COUNT(*), ' estudiantes para ', v_nombre_ciclo)
    INTO v_estudiantes_inscritos
    FROM Estudiante E
    WHERE E.id_colegio = p_id_colegio AND E.estado_matricula = 'A';

    -- Docentes activos
    SELECT CONCAT(COUNT(*), ' maestros para ', v_nombre_ciclo)
    INTO v_docentes_activos
    FROM PersonalDocente PD
    WHERE PD.id_colegio = p_id_colegio AND PD.estado_empleo = 'A';

    -- Porcentaje de cuotas pagadas
    SELECT CONCAT('Pagadas: ', 
                  ROUND((SUM(CASE WHEN CE.estado = 'G' THEN 1 ELSE 0 END) / COUNT(*)) * 100, 2), 
                  '% de 100%')
    INTO v_ptje_cuotas_pagadas
    FROM CuotaEstudiante CE
    WHERE LEFT(CE.periodo, 4) = v_anio_ciclo;

    -- Actividades del mes
    SELECT CONCAT(COUNT(*), ' actividades (GTQ.', COALESCE(SUM(GE.monto), 0), ')')
    INTO v_actividades_mes
    FROM GastoExtraordinario GE
    WHERE GE.id_colegio = p_id_colegio 
      AND YEAR(GE.fecha_gasto) = YEAR(CURDATE())
      AND MONTH(GE.fecha_gasto) = MONTH(CURDATE());

    -- Devolver todas las variables en un solo SELECT
    SELECT v_estudiantes_inscritos AS estudiantes_inscritos,
           v_docentes_activos AS docentes_activos,
           v_ptje_cuotas_pagadas AS ptje_cuotas_pagadas,
           v_actividades_mes AS actividades_mes;
END