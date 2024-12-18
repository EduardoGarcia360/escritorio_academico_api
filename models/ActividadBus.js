import { DataTypes, Model } from "sequelize";

class ActividadBus extends Model {
  static init(sequelize) {
    return super.init(
      {
        id_actividad: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        id_colegio: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        nombre_actividad: {
          type: DataTypes.STRING(100),
        },
        fecha_inicio: {
          type: DataTypes.DATEONLY,
        },
        fecha_fin: {
          type: DataTypes.DATEONLY,
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
        modelName: "ActividadBus",
        tableName: "ActividadBus",
        timestamps: true,
      }
    );
  }
}

export default ActividadBus;
