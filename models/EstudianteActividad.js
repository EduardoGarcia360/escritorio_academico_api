import { DataTypes, Model } from "sequelize";

class EstudianteActividad extends Model {
  static init(sequelize) {
    return super.init(
      {
        id_estudiante_actividad: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        id_estudiante: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        id_actividad: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        id_bus: {
          type: DataTypes.INTEGER,
          allowNull: false,
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
        modelName: "EstudianteActividad",
        tableName: "EstudianteActividad",
        timestamps: true,
      }
    );
  }
}

export default EstudianteActividad;
