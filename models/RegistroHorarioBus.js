import { DataTypes, Model } from "sequelize";

class RegistroHorarioBus extends Model {
  static init(sequelize) {
    return super.init(
      {
        id_registro_horario: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        id_asignacion_transporte: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        tipo_registro: {
          type: DataTypes.ENUM("S", "L"),
          allowNull: false,
          comment: "S=Salida, L=Llegada",
        },
        fecha_hora: {
          type: DataTypes.DATE,
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
        observaciones: {
          type: DataTypes.STRING(250),
        },
        id_usuario_creo: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "RegistroHorarioBus",
        tableName: "RegistroHorarioBus",
        timestamps: true,
      }
    );
  }
}

export default RegistroHorarioBus;
