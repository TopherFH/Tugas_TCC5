import { Sequelize } from "sequelize";
import db from "../config/database.js";

const User = db.define('users', {
    name:Sequelize.STRING,
    notes:Sequelize.STRING,
    });

export default User;

    (async ()=>{
        await db.sync();
    })();