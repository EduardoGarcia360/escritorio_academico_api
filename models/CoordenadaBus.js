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
        id_asignacion_transporte: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        latitud: {
          type: DataTypes.DECIMAL(10, 6),
          allowNull: false,
        },
        longitud: {
          type: DataTypes.DECIMAL(10, 6),
          allowNull: false,
        },
        accuracy: {
          type: DataTypes.DECIMAL(10, 6),
          comment: "Precisión del GPS en metros (Ej: 16.134)",
        },
        altitude: {
          type: DataTypes.DECIMAL(10, 6),
          comment: "Altitud en metros sobre el nivel del mar (Ej: 1503.699951)",
        },
        altitude_accuracy: {
          type: DataTypes.DECIMAL(10, 6),
          comment: "Precisión de la altitud (Ej: 1.069285)",
        },
        simulated: {
          type: DataTypes.BOOLEAN,
          comment: "Indica si la ubicación es simulada (Ej: false)",
        },
        speed: {
          type: DataTypes.DECIMAL(10, 7),
          comment: "Velocidad en metros por segundo (Ej: 0.1275473)",
        },
        bearing: {
          type: DataTypes.DECIMAL(10, 5),
          comment: "Dirección en grados (Ej: 172.43936)",
        },
        time: {
          type: DataTypes.BIGINT,
          comment: "Marca de tiempo en milisegundos (Ej: 1740789114379)",
        },
        id_usuario_creo: {
          type: DataTypes.INTEGER,
          allowNull: true,
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
