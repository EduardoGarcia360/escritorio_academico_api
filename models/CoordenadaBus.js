import { DataTypes, Model } from "sequelize";

class CoordenadaBus extends Model {
  static init(sequelize) {
    return super.init(
      {
        id_coordenada: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        id_bus: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        latitud: {
          type: DataTypes.DECIMAL(10, 6),
        },
        longitud: {
          type: DataTypes.DECIMAL(10, 6),
        },
        fecha_registro: {
          type: DataTypes.DATE,
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
        modelName: "CoordenadaBus",
        tableName: "CoordenadaBus",
        timestamps: true,
      }
    );
  }
}

export default CoordenadaBus;
