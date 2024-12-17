const setupAssociations = (models) => {
    const { 
        Usuario, 
        Colegio, 
        NivelEducacion, 
        Jornada, 
        JornadaCicloEscolar, 
        CicloEscolar,
        Grado,
        PersonalDocente,
        Estudiante,
    } = models;

    // Relaciones para Colegio
    Usuario.hasMany(Colegio, { foreignKey: "id_usuario_creo" });
    Usuario.hasMany(Colegio, { foreignKey: "id_usuario_modifico" });
    Colegio.belongsTo(Usuario, { as: "creador", foreignKey: "id_usuario_creo" });
    Colegio.belongsTo(Usuario, { as: "modificador", foreignKey: "id_usuario_modifico" });

    // Relaciones para CicloEscolar
    Colegio.hasMany(CicloEscolar, { foreignKey: "id_colegio" });
    CicloEscolar.belongsTo(Colegio, { foreignKey: "id_colegio" });

    Usuario.hasMany(CicloEscolar, { foreignKey: "id_usuario_creo" });
    Usuario.hasMany(CicloEscolar, { foreignKey: "id_usuario_modifico" });
    CicloEscolar.belongsTo(Usuario, { as: "creador", foreignKey: "id_usuario_creo" });
    CicloEscolar.belongsTo(Usuario, { as: "modificador", foreignKey: "id_usuario_modifico" });

    // Relaciones para NivelEducacion
    Colegio.hasMany(NivelEducacion, { foreignKey: "id_colegio" });
    NivelEducacion.belongsTo(Colegio, { foreignKey: "id_colegio" });
    Usuario.hasMany(NivelEducacion, { foreignKey: "id_usuario_creo" });
    Usuario.hasMany(NivelEducacion, { foreignKey: "id_usuario_modifico" });

    // Relaciones para Jornada
    NivelEducacion.hasMany(Jornada, { foreignKey: "id_nivel" });
    Jornada.belongsTo(NivelEducacion, { foreignKey: "id_nivel" });
    Usuario.hasMany(Jornada, { foreignKey: "id_usuario_creo" });
    Usuario.hasMany(Jornada, { foreignKey: "id_usuario_modifico" });

    // Relaciones para JornadaCicloEscolar
    Jornada.hasMany(JornadaCicloEscolar, { foreignKey: "id_jornada" });
    JornadaCicloEscolar.belongsTo(Jornada, { foreignKey: "id_jornada" });
    CicloEscolar.hasMany(JornadaCicloEscolar, { foreignKey: "id_ciclo" });
    JornadaCicloEscolar.belongsTo(CicloEscolar, { foreignKey: "id_ciclo" });
    Usuario.hasMany(JornadaCicloEscolar, { foreignKey: "id_usuario_creo" });
    Usuario.hasMany(JornadaCicloEscolar, { foreignKey: "id_usuario_modifico" });

    // Relaciones para Grado
    JornadaCicloEscolar.hasMany(Grado, { foreignKey: "id_jornada_ciclo" });
    Grado.belongsTo(JornadaCicloEscolar, { foreignKey: "id_jornada_ciclo" });
    Usuario.hasMany(Grado, { foreignKey: "id_usuario_creo" });
    Usuario.hasMany(Grado, { foreignKey: "id_usuario_modifico" });

    // Relaciones para PersonalDocente
    Colegio.hasMany(PersonalDocente, { foreignKey: "id_colegio" });
    PersonalDocente.belongsTo(Colegio, { foreignKey: "id_colegio" });
    Usuario.hasMany(PersonalDocente, { foreignKey: "id_usuario_creo" });
    Usuario.hasMany(PersonalDocente, { foreignKey: "id_usuario_modifico" });

    // Relaciones para Estudiante
    Colegio.hasMany(Estudiante, { foreignKey: "id_colegio" });
    Estudiante.belongsTo(Colegio, { foreignKey: "id_colegio" });
    Usuario.hasMany(Estudiante, { foreignKey: "id_usuario_creo" });
    Usuario.hasMany(Estudiante, { foreignKey: "id_usuario_modifico" });

};

export default setupAssociations;
