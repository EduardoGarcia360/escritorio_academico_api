import { DataTypes, Model } from "sequelize";

class Estudiante extends Model {
  static init(sequelize) {
    return super.init(
      {
        id_estudiante: {
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
          allowNull: false,
        },
        fecha_nacimiento: {
          type: DataTypes.DATEONLY,
        },
        identificacion: {
          type: DataTypes.STRING(50),
          unique: true,
          allowNull: false,
        },
        direccion: {
          type: DataTypes.STRING(255),
        },
        telefono_contacto: {
          type: DataTypes.STRING(20),
        },
        correo_electronico: {
          type: DataTypes.STRING(100),
        },
        nombre_tutor: {
          type: DataTypes.STRING(100),
        },
        telefono_tutor: {
          type: DataTypes.STRING(20),
        },
        estado_matricula: {
          type: DataTypes.ENUM("A", "R", "G"),
          comment: "A=Activo, R=Retirado, G=Graduado",
        },
        codigo_estudiante: {
          type: DataTypes.STRING(20),
          unique: true,
        },
        fecha_inscripcion: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        sexo: {
          type: DataTypes.ENUM("M", "F", "O"),
          comment: "M=Masculino, F=Femenino, O=Otro",
        },
        condiciones_especiales: {
          type: DataTypes.STRING(255),
        },
        observaciones: {
          type: DataTypes.STRING(255),
        },
        id_usuario_creo: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        id_usuario_modifico: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        fotografia: {
          type: DataTypes.STRING(1000),
        },
      },
      {
        sequelize,
        modelName: "Estudiante",
        tableName: "Estudiante",
        timestamps: true,
      }
    );
  }
}

export default Estudiante;
