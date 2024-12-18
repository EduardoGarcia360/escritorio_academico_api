import { DataTypes, Model } from "sequelize";

class Tutor extends Model {
  static init(sequelize) {
    return super.init(
      {
        id_tutor: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        id_colegio: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        nombre_completo: {
          type: DataTypes.STRING(100),
        },
        identificacion: {
          type: DataTypes.STRING(50),
        },
        telefono: {
          type: DataTypes.STRING(20),
        },
        correo_electronico: {
          type: DataTypes.STRING(100),
        },
        direccion: {
          type: DataTypes.STRING(255),
        },
        relacion_colegio: {
          type: DataTypes.STRING(50),
        },
        id_usuario: {
          type: DataTypes.INTEGER,
          allowNull: true,
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
        modelName: "Tutor",
        tableName: "Tutor",
        timestamps: true,
      }
    );
  }
}

export default Tutor;
