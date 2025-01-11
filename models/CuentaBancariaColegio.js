import { DataTypes, Model } from "sequelize";

class CuentaBancariaColegio extends Model {
  static init(sequelize) {
    return super.init(
      {
        id_cuenta_colegio: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        id_colegio: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        id_banco: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        numero_cuenta: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        tipo_cuenta: {
          type: DataTypes.ENUM("A", "M", "C"),
          comment: "A=Ahorro, M=Monetarias, C=Corrientes",
        },
        nombre_titular: {
          type: DataTypes.STRING(100),
        },
        moneda: {
          type: DataTypes.STRING(10),
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
        modelName: "CuentaBancariaColegio",
        tableName: "CuentaBancariaColegio",
        timestamps: true,
      }
    );
  }
}

export default CuentaBancariaColegio;
