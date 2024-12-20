import { DataTypes, Model } from "sequelize";

class UsuarioColegio extends Model {
  static init(sequelize) {
    return super.init(
      {
        id_usuario_colegio: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        id_usuario: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        id_colegio: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "UsuarioColegio",
        tableName: "UsuarioColegio",
        timestamps: true,
      }
    );
  }
}

export default UsuarioColegio;
