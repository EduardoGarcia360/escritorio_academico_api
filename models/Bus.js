import { DataTypes, Model } from "sequelize";

class Bus extends Model {
  static init(sequelize) {
    return super.init(
      {
        id_bus: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        matricula: {
          type: DataTypes.STRING(50),
        },
        capacidad: {
          type: DataTypes.INTEGER,
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
        modelName: "Bus",
        tableName: "Bus",
        timestamps: true,
      }
    );
  }
}

export default Bus;
