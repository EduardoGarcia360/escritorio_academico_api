import { DataTypes, Model } from "sequelize";

class UsuarioTutor extends Model {
  static init(sequelize) {
    return super.init(
      {
        id_usuario_tutor: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        id_usuario: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        id_tutor: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        id_usuario_creo: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        id_usuario_modifico: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "UsuarioTutor",
        tableName: "UsuarioTutor",
        timestamps: true,
      }
    );
  }
}

export default UsuarioTutor;
