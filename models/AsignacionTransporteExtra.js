import { DataTypes, Model } from "sequelize";

class AsignacionTransporteExtra extends Model {
  static init(sequelize) {
    return super.init(
      {
        id_asignacion_transporte: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        id_asignacion: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        id_bus: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        id_docente: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        nombre_piloto: {
          type: DataTypes.STRING(100),
        },
        licencia: {
          type: DataTypes.STRING(50),
        },
        telefono_piloto: {
          type: DataTypes.STRING(20),
        },
        observaciones: {
          type: DataTypes.TEXT,
        },
        estado: {
          type: DataTypes.ENUM("A", "F"),
          defaultValue: "A",
          allowNull: false,
          comment: "A=Activo, F=Finalizado",
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
        modelName: "AsignacionTransporteExtra",
        tableName: "AsignacionTransporteExtra",
        timestamps: true,
      }
    );
  }
}

export default AsignacionTransporteExtra;
