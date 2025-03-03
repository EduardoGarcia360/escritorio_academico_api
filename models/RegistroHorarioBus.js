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
        latitud: {
          type: DataTypes.DECIMAL(10, 6),
        },
        longitud: {
          type: DataTypes.DECIMAL(10, 6),
        },
        observaciones: {
          type: DataTypes.STRING(250),
        },
        estado: {
          type: DataTypes.ENUM("A", "F"),
          defaultValue: "A",
          allowNull: false,
          comment: "A=Activo, F=Finalizado",
        },
        fecha_hora: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
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
