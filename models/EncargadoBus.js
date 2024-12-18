import { DataTypes, Model } from "sequelize";

class EncargadoBus extends Model {
  static init(sequelize) {
    return super.init(
      {
        id_encargado_bus: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        id_bus: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        id_docente: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        rol_encargado: {
          type: DataTypes.STRING(50),
        },
        id_usuario_creo: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        id_usuario_modifico: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "EncargadoBus",
        tableName: "EncargadoBus",
        timestamps: true,
      }
    );
  }
}

export default EncargadoBus;
