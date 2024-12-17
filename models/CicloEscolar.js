import { DataTypes, Model } from "sequelize";

class CicloEscolar extends Model {
  static init(sequelize) {
    return super.init(
      {
        id_ciclo: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        id_colegio: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        nombre: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        fecha_inicio: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        fecha_fin: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        estado: {
          type: DataTypes.ENUM("A", "I", "C"),
          comment: "A=Activo, I=Inactivo, C=Cerrado",
        },
        id_usuario_creo: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        id_usuario_modifico: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        createdAt: {
          type: DataTypes.DATE,
        },
        updatedAt: {
          type: DataTypes.DATE,
        },
      },
      {
        sequelize,
        modelName: "CicloEscolar",
        tableName: "CicloEscolar",
        timestamps: true
      }
    );
  }
}

export default CicloEscolar;
