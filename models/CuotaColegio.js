import { DataTypes, Model } from "sequelize";

class CuotaColegio extends Model {
  static init(sequelize) {
    return super.init(
      {
        id_cuota: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        id_colegio: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        nombre_cuota: {
          type: DataTypes.STRING(100),
        },
        monto: {
          type: DataTypes.DECIMAL(10, 2),
        },
        periodicidad: {
          type: DataTypes.STRING(50),
        },
        fecha_creacion: {
          type: DataTypes.DATEONLY,
        },
        fecha_modificacion: {
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
        modelName: "CuotaColegio",
        tableName: "CuotaColegio",
        timestamps: true,
      }
    );
  }
}

export default CuotaColegio;
