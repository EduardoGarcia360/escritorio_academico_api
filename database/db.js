import { Sequelize } from "sequelize";

const db = new Sequelize('escritorio_academico', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db
