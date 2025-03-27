CREATE DEFINER=`root`@`localhost` PROCEDURE escritorio_academico.valoresEstudianteColegioEstadoCuentaPadre(IN p_id_estudiante INT,
    IN p_id_colegio INT)
begin
	-- Listar los valores del estudiante y del colegio
    SELECT 
        E.nombre_completo AS estudiante_nombre,
        COALESCE(E.fotografia, 'https://fastly.picsum.photos/id/64/4326/2884.jpg?hmac=9_SzX666YRpR_fOyYStXpfSiJ_edO3ghlSRnH2w09Kg') AS estudiante_fotografia,
        CONCAT(G.nombre, ' ', G.seccion) AS grado,
        C.nombre AS colegio_nombre,
        C.telefono AS colegio_telefono,
        C.correo_electronico AS colegio_correo,
        COALESCE(C.logo, 'https://fastly.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY') AS colegio_logo
    FROM Estudiante E
    LEFT JOIN AsignacionEstudianteGrado AEG ON E.id_estudiante = AEG.id_estudiante
    LEFT JOIN Grado G ON AEG.id_grado = G.id_grado
    INNER JOIN Colegio C ON E.id_colegio = C.id_colegio
    WHERE E.id_estudiante = p_id_estudiante AND E.id_colegio = p_id_colegio;
END