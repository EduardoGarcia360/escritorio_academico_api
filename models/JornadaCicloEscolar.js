import { DataTypes, Model } from "sequelize";

class JornadaCicloEscolar extends Model {
  static init(sequelize) {
    return super.init(
      {
        id_jornada_ciclo: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        id_jornada: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        id_ciclo: {
          type: DataTypes.INTEGER,
          allowNull: false,
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
        modelName: "JornadaCicloEscolar",
        tableName: "JornadaCicloEscolar",
        timestamps: true,
      }
    );
  }
}

export default JornadaCicloEscolar;
