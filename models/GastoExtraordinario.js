import { DataTypes, Model } from "sequelize";

class GastoExtraordinario extends Model {
  static init(sequelize) {
    return super.init(
      {
        id_gasto: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        id_colegio: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        nombre_gasto: {
          type: DataTypes.STRING(100),
        },
        monto: {
          type: DataTypes.DECIMAL(10, 2),
        },
        fecha_gasto: {
          type: DataTypes.DATEONLY,
        },
        descripcion: {
          type: DataTypes.STRING(255),
        },
        es_actividad_bus: {
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
        modelName: "GastoExtraordinario",
        tableName: "GastoExtraordinario",
        timestamps: true,
      }
    );
  }
}

export default GastoExtraordinario;
