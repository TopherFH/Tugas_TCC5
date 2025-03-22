import { Sequelize } from "sequelize";

const db = new Sequelize('notes', 'root', 'topher13', {
    host:'34.67.233.176',
    dialect:'mysql',
})

export default db