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
        id_colegio: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        matricula: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        capacidad: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        marca: {
          type: DataTypes.STRING(50),
        },
        modelo: {
          type: DataTypes.STRING(50),
        },
        anio: {
          type: DataTypes.INTEGER,
        },
        color: {
          type: DataTypes.STRING(30),
        },
        numero_seguro: {
          type: DataTypes.STRING(50),
        },
        fecha_proximo_mantenimiento: {
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
        modelName: "Bus",
        tableName: "Bus",
        timestamps: true,
      }
    );
  }
}

export default Bus;
