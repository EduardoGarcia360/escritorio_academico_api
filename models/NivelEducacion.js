import { DataTypes, Model } from "sequelize";

class NivelEducacion extends Model {
  static init(sequelize) {
    return super.init(
      {
        id_nivel: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        id_colegio: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        nombre: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        descripcion: {
          type: DataTypes.STRING(255),
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
        modelName: "NivelEducacion",
        tableName: "NivelEducacion",
        timestamps: true,
      }
    );
  }
}

export default NivelEducacion;
