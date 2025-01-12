import { DataTypes, Model } from "sequelize";

class Banco extends Model {
  static init(sequelize) {
    return super.init(
      {
        id_banco: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        id_colegio: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        nombre_banco: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        direccion: {
          type: DataTypes.STRING(255),
        },
        telefono: {
          type: DataTypes.STRING(20),
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
        modelName: "Banco",
        tableName: "Banco",
        timestamps: true,
      }
    );
  }
}

export default Banco;
