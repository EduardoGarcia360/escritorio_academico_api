import { DataTypes, Model } from "sequelize";

class TutorEstudiante extends Model {
  static init(sequelize) {
    return super.init(
      {
        id_relacion: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        id_tutor: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        id_estudiante: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        relacion: {
          type: DataTypes.STRING(50),
        },
        es_responsable_principal: {
          type: DataTypes.BOOLEAN,
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
        modelName: "TutorEstudiante",
        tableName: "TutorEstudiante",
        timestamps: true,
      }
    );
  }
}

export default TutorEstudiante;
