import { DataTypes, Model } from "sequelize";

class CuotaEstudiante extends Model {
  static init(sequelize) {
    return super.init(
      {
        id_cuota_estudiante: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        id_cuota: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        id_estudiante: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        periodo: {
          type: DataTypes.STRING(50),
        },
        monto: {
          type: DataTypes.DECIMAL(10, 2),
        },
        estado: {
          type: DataTypes.ENUM("P", "R", "G"),
          comment: "P=Pendiente, R=Parcial, G=Pagada",
        },
        fecha_vencimiento: {
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
      },
      {
        sequelize,
        modelName: "CuotaEstudiante",
        tableName: "CuotaEstudiante",
        timestamps: true,
      }
    );
  }
}

export default CuotaEstudiante;
