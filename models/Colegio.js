import { DataTypes, Model } from "sequelize";

class Colegio extends Model {
  static init(sequelize) {
    return super.init(
      {
        id_colegio: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nombre: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        direccion: {
          type: DataTypes.STRING(255),
        },
        telefono: {
          type: DataTypes.STRING(20),
        },
        correo_electronico: {
          type: DataTypes.STRING(100),
        },
        pagina_web: {
          type: DataTypes.STRING(100),
        },
        logo: {
          type: DataTypes.STRING(255),
        },
        tipo_colegio: {
          type: DataTypes.STRING(50),
        },
        director: {
          type: DataTypes.STRING(100),
        },
        fecha_creacion: {
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
        createdAt: {
          type: DataTypes.DATE,
        },
        updatedAt: {
          type: DataTypes.DATE,
        },
      },
      {
        sequelize,
        modelName: "Colegio",
        tableName: "Colegio",
        timestamps: true,
      }
    );
  }
}

export default Colegio;
