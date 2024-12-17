import { DataTypes, Model } from "sequelize";

class PersonalDocente extends Model {
  static init(sequelize) {
    return super.init(
      {
        id_docente: {
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
        identificacion: {
          type: DataTypes.STRING(50),
          unique: true,
          allowNull: false,
        },
        telefono: {
          type: DataTypes.STRING(20),
        },
        correo_electronico: {
          type: DataTypes.STRING(100),
          unique: true,
        },
        direccion: {
          type: DataTypes.STRING(255),
        },
        titulo_academico: {
          type: DataTypes.STRING(100),
        },
        codigo_empleado: {
          type: DataTypes.STRING(20),
          unique: true,
        },
        fecha_ingreso: {
          type: DataTypes.DATEONLY,
        },
        fecha_egreso: {
          type: DataTypes.DATEONLY,
        },
        especialidad: {
          type: DataTypes.STRING(50),
        },
        estado_empleo: {
          type: DataTypes.ENUM("A", "L", "R"),
          comment: "A=Activo, L=Licencia, R=Retirado",
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
        modelName: "PersonalDocente",
        tableName: "PersonalDocente",
        timestamps: true,
      }
    );
  }
}

export default PersonalDocente;
