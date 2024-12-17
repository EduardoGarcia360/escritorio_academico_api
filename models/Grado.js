import { DataTypes, Model } from "sequelize";

class Grado extends Model {
  static init(sequelize) {
    return super.init(
      {
        id_grado: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        id_jornada_ciclo: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        nombre: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        seccion: {
          type: DataTypes.STRING(10),
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
        modelName: "Grado",
        tableName: "Grado",
        timestamps: true,
      }
    );
  }
}

export default Grado;
