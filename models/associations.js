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
        AsignacionDocenteGrado,
        AsignacionEstudianteGrado,
        Tutor,
        TutorEstudiante,
        CuotaColegio,
        CuotaEstudiante,
        PagoCuota,
        GastoExtraordinario,
        DetalleGastoTutor,
        ActividadBus,
        Bus,
        EncargadoBus,
        EstudianteActividad,
        CoordenadaBus,
        UsuarioColegio,
        Banco,
        CuentaBancariaColegio,
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

    // Relaciones para AsignacionDocenteGrado
    PersonalDocente.hasMany(AsignacionDocenteGrado, { foreignKey: "id_docente" });
    AsignacionDocenteGrado.belongsTo(PersonalDocente, { foreignKey: "id_docente" });
    Grado.hasMany(AsignacionDocenteGrado, { foreignKey: "id_grado" });
    AsignacionDocenteGrado.belongsTo(Grado, { foreignKey: "id_grado" });
    Usuario.hasMany(AsignacionDocenteGrado, { foreignKey: "id_usuario_creo" });
    Usuario.hasMany(AsignacionDocenteGrado, { foreignKey: "id_usuario_modifico" });

    // Relaciones para AsignacionEstudianteGrado
    Estudiante.hasMany(AsignacionEstudianteGrado, { foreignKey: "id_estudiante" });
    AsignacionEstudianteGrado.belongsTo(Estudiante, { foreignKey: "id_estudiante" });
    Grado.hasMany(AsignacionEstudianteGrado, { foreignKey: "id_grado" });
    AsignacionEstudianteGrado.belongsTo(Grado, { foreignKey: "id_grado" });
    Usuario.hasMany(AsignacionEstudianteGrado, { foreignKey: "id_usuario_creo" });
    Usuario.hasMany(AsignacionEstudianteGrado, { foreignKey: "id_usuario_modifico" });

    // Relaciones para Tutor
    Colegio.hasMany(Tutor, { foreignKey: "id_colegio" });
    Tutor.belongsTo(Colegio, { foreignKey: "id_colegio" });
    Usuario.hasMany(Tutor, { foreignKey: "id_usuario_creo" });
    Usuario.hasMany(Tutor, { foreignKey: "id_usuario_modifico" });
    Usuario.hasMany(Tutor, { foreignKey: "id_usuario" });
    Tutor.belongsTo(Usuario, { foreignKey: "id_usuario" });

    // Relaciones para TutorEstudiante
    Tutor.hasMany(TutorEstudiante, { foreignKey: "id_tutor" });
    TutorEstudiante.belongsTo(Tutor, { foreignKey: "id_tutor" });
    Estudiante.hasMany(TutorEstudiante, { foreignKey: "id_estudiante" });
    TutorEstudiante.belongsTo(Estudiante, { foreignKey: "id_estudiante" });
    Usuario.hasMany(TutorEstudiante, { foreignKey: "id_usuario_creo" });
    Usuario.hasMany(TutorEstudiante, { foreignKey: "id_usuario_modifico" });

    // Relaciones para CuotaColegio
    Colegio.hasMany(CuotaColegio, { foreignKey: "id_colegio" });
    CuotaColegio.belongsTo(Colegio, { foreignKey: "id_colegio" });
    Usuario.hasMany(CuotaColegio, { foreignKey: "id_usuario_creo" });
    Usuario.hasMany(CuotaColegio, { foreignKey: "id_usuario_modifico" });

    // Relaciones para CuotaEstudiante
    CuotaColegio.hasMany(CuotaEstudiante, { foreignKey: "id_cuota" });
    CuotaEstudiante.belongsTo(CuotaColegio, { foreignKey: "id_cuota" });
    Estudiante.hasMany(CuotaEstudiante, { foreignKey: "id_estudiante" });
    CuotaEstudiante.belongsTo(Estudiante, { foreignKey: "id_estudiante" });
    Usuario.hasMany(CuotaEstudiante, { foreignKey: "id_usuario_creo" });
    Usuario.hasMany(CuotaEstudiante, { foreignKey: "id_usuario_modifico" });

    // Relaciones para PagoCuota
    CuotaEstudiante.hasMany(PagoCuota, { foreignKey: "id_cuota_estudiante" });
    PagoCuota.belongsTo(CuotaEstudiante, { foreignKey: "id_cuota_estudiante" });
    CuentaBancariaColegio.hasMany(PagoCuota, { foreignKey: "id_cuenta_colegio" });
    PagoCuota.belongsTo(CuentaBancariaColegio, { foreignKey: "id_cuenta_colegio" });
    Usuario.hasMany(PagoCuota, { foreignKey: "id_usuario_creo" });
    Usuario.hasMany(PagoCuota, { foreignKey: "id_usuario_modifico" });
    PagoCuota.belongsTo(Usuario, { foreignKey: "id_usuario_creo" });
    PagoCuota.belongsTo(Usuario, { foreignKey: "id_usuario_modifico" });

    // Relaciones para GastoExtraordinario
    Colegio.hasMany(GastoExtraordinario, { foreignKey: "id_colegio" });
    GastoExtraordinario.belongsTo(Colegio, { foreignKey: "id_colegio" });
    Usuario.hasMany(GastoExtraordinario, { foreignKey: "id_usuario_creo" });
    Usuario.hasMany(GastoExtraordinario, { foreignKey: "id_usuario_modifico" });

    // Relaciones para DetalleGastoTutor
    GastoExtraordinario.hasMany(DetalleGastoTutor, { foreignKey: "id_gasto" });
    DetalleGastoTutor.belongsTo(GastoExtraordinario, { foreignKey: "id_gasto" });
    Tutor.hasMany(DetalleGastoTutor, { foreignKey: "id_tutor" });
    DetalleGastoTutor.belongsTo(Tutor, { foreignKey: "id_tutor" });
    Estudiante.hasMany(DetalleGastoTutor, { foreignKey: "id_estudiante" });
    DetalleGastoTutor.belongsTo(Estudiante, { foreignKey: "id_estudiante" });
    Usuario.hasMany(DetalleGastoTutor, { foreignKey: "id_usuario_creo" });
    Usuario.hasMany(DetalleGastoTutor, { foreignKey: "id_usuario_modifico" });

    // Relaciones para ActividadBus
    Colegio.hasMany(ActividadBus, { foreignKey: "id_colegio" });
    ActividadBus.belongsTo(Colegio, { foreignKey: "id_colegio" });
    Usuario.hasMany(ActividadBus, { foreignKey: "id_usuario_creo" });
    Usuario.hasMany(ActividadBus, { foreignKey: "id_usuario_modifico" });

    // Relaciones para Bus
    Usuario.hasMany(Bus, { foreignKey: "id_usuario_creo" });
    Usuario.hasMany(Bus, { foreignKey: "id_usuario_modifico" });

    // Relaciones para EncargadoBus
    Bus.hasMany(EncargadoBus, { foreignKey: "id_bus" });
    EncargadoBus.belongsTo(Bus, { foreignKey: "id_bus" });
    PersonalDocente.hasMany(EncargadoBus, { foreignKey: "id_docente" });
    EncargadoBus.belongsTo(PersonalDocente, { foreignKey: "id_docente" });
    Usuario.hasMany(EncargadoBus, { foreignKey: "id_usuario_creo" });
    Usuario.hasMany(EncargadoBus, { foreignKey: "id_usuario_modifico" });

    // Relaciones para EstudianteActividad
    Estudiante.hasMany(EstudianteActividad, { foreignKey: "id_estudiante" });
    EstudianteActividad.belongsTo(Estudiante, { foreignKey: "id_estudiante" });
    ActividadBus.hasMany(EstudianteActividad, { foreignKey: "id_actividad" });
    EstudianteActividad.belongsTo(ActividadBus, { foreignKey: "id_actividad" });
    Bus.hasMany(EstudianteActividad, { foreignKey: "id_bus" });
    EstudianteActividad.belongsTo(Bus, { foreignKey: "id_bus" });
    Usuario.hasMany(EstudianteActividad, { foreignKey: "id_usuario_creo" });
    Usuario.hasMany(EstudianteActividad, { foreignKey: "id_usuario_modifico" });

    // Relaciones para CoordenadaBus
    Bus.hasMany(CoordenadaBus, { foreignKey: "id_bus" });
    CoordenadaBus.belongsTo(Bus, { foreignKey: "id_bus" });
    Usuario.hasMany(CoordenadaBus, { foreignKey: "id_usuario_creo" });
    Usuario.hasMany(CoordenadaBus, { foreignKey: "id_usuario_modifico" });

    // Relaciones para UsuarioColegio
    Usuario.hasMany(UsuarioColegio, { foreignKey: "id_usuario" });
    UsuarioColegio.belongsTo(Usuario, { foreignKey: "id_usuario" });
    Colegio.hasMany(UsuarioColegio, { foreignKey: "id_colegio" });
    UsuarioColegio.belongsTo(Colegio, { foreignKey: "id_colegio" });

    // Relaciones para Banco
    Usuario.hasMany(Banco, { foreignKey: "id_usuario_creo" });
    Usuario.hasMany(Banco, { foreignKey: "id_usuario_modifico" });
    Banco.belongsTo(Usuario, { as: "creador", foreignKey: "id_usuario_creo" });
    Banco.belongsTo(Usuario, { as: "modificador", foreignKey: "id_usuario_modifico" });
    Colegio.hasMany(Banco, { foreignKey: "id_colegio" });
    Banco.belongsTo(Colegio, { foreignKey: "id_colegio" });

    // Relaciones para CuentaBancariaColegio
    Colegio.hasMany(CuentaBancariaColegio, { foreignKey: "id_colegio" });
    CuentaBancariaColegio.belongsTo(Colegio, { foreignKey: "id_colegio" });

    Banco.hasMany(CuentaBancariaColegio, { foreignKey: "id_banco" });
    CuentaBancariaColegio.belongsTo(Banco, { foreignKey: "id_banco" });

    Usuario.hasMany(CuentaBancariaColegio, { foreignKey: "id_usuario_creo" });
    Usuario.hasMany(CuentaBancariaColegio, { foreignKey: "id_usuario_modifico" });
    CuentaBancariaColegio.belongsTo(Usuario, { as: "creador", foreignKey: "id_usuario_creo" });
    CuentaBancariaColegio.belongsTo(Usuario, { as: "modificador", foreignKey: "id_usuario_modifico" });
};

export default setupAssociations;
