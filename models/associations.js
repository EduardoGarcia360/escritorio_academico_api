const setupAssociations = (models) => {
    const { Usuario, Colegio, CicloEscolar } = models;

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

};

export default setupAssociations;
