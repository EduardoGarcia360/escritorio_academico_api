import { DataTypes, Model } from "sequelize";

class AsignacionDocenteGrado extends Model {
  static init(sequelize) {
    return super.init(
      {
        id_asignacion: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        id_docente: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        id_grado: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        fecha_asignacion: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        rol_docente: {
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
        modelName: "AsignacionDocenteGrado",
        tableName: "AsignacionDocenteGrado",
        timestamps: true,
      }
    );
  }
}

export default AsignacionDocenteGrado;
