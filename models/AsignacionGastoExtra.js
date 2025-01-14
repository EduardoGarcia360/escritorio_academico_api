import { DataTypes, Model } from "sequelize";

class AsignacionGastoExtra extends Model {
  static init(sequelize) {
    return super.init(
      {
        id_asignacion: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        id_gasto: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        id_grado: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        monto: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        descripcion: {
          type: DataTypes.TEXT,
        },
        fecha_asignacion: {
          type: DataTypes.DATEONLY,
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
        modelName: "AsignacionGastoExtra",
        tableName: "AsignacionGastoExtra",
        timestamps: true,
      }
    );
  }
}

export default AsignacionGastoExtra;
