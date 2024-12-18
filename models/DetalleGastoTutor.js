import { DataTypes, Model } from "sequelize";

class DetalleGastoTutor extends Model {
  static init(sequelize) {
    return super.init(
      {
        id_detalle: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        id_gasto: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        id_tutor: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        id_estudiante: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        monto_tutor: {
          type: DataTypes.DECIMAL(10, 2),
        },
        pagado: {
          type: DataTypes.BOOLEAN,
        },
        fecha_pago: {
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
        modelName: "DetalleGastoTutor",
        tableName: "DetalleGastoTutor",
        timestamps: true,
      }
    );
  }
}

export default DetalleGastoTutor;
