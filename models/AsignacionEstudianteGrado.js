import { DataTypes, Model } from "sequelize";

class AsignacionEstudianteGrado extends Model {
  static init(sequelize) {
    return super.init(
      {
        id_asignacion: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        id_estudiante: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        id_grado: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        fecha_inscripcion: {
          type: DataTypes.DATEONLY,
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
        modelName: "AsignacionEstudianteGrado",
        tableName: "AsignacionEstudianteGrado",
        timestamps: true,
      }
    );
  }
}

export default AsignacionEstudianteGrado;
