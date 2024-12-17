import { DataTypes, Model } from "sequelize";

class Jornada extends Model {
  static init(sequelize) {
    return super.init(
      {
        id_jornada: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        id_nivel: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        nombre: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        horario_inicio: {
          type: DataTypes.TIME,
        },
        horario_fin: {
          type: DataTypes.TIME,
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
        modelName: "Jornada",
        tableName: "Jornada",
        timestamps: true,
      }
    );
  }
}

export default Jornada;
