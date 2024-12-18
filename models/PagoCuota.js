import { DataTypes, Model } from "sequelize";

class PagoCuota extends Model {
  static init(sequelize) {
    return super.init(
      {
        id_pago: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        id_cuota_estudiante: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        monto_pagado: {
          type: DataTypes.DECIMAL(10, 2),
        },
        fecha_pago: {
          type: DataTypes.DATEONLY,
        },
        metodo_pago: {
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
        modelName: "PagoCuota",
        tableName: "PagoCuota",
        timestamps: true,
      }
    );
  }
}

export default PagoCuota;
