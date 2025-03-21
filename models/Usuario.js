import { DataTypes, Model } from "sequelize";

class Usuario extends Model {
  static init(sequelize) {
    return super.init(
      {
        id_usuario: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nombre_usuario: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true,
        },
        contrasena: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        nombre_completo: {
          type: DataTypes.STRING(100),
        },
        correo_electronico: {
          type: DataTypes.STRING(100),
          unique: true,
        },
        rol: {
          type: DataTypes.ENUM("A", "D", "E", "O", "P"),
          allowNull: false,
          comment: "A=Administrador, D=Docente, E=Estudiante, O=Otro, P=Padre de Familia",
        },
        estado: {
          type: DataTypes.ENUM("A", "I"),
          defaultValue: "A",
          comment: "A=Activo, I=Inactivo",
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
        modelName: "Usuario",
        tableName: "Usuario",
        timestamps: true
      }
    );
  }
}

export default Usuario;
