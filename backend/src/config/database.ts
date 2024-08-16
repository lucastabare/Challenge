import { Sequelize } from "sequelize";
import { db_host, db_port, db_user, db_pass, db_name } from './venv';


export const databaseSequelize = new Sequelize(
    db_name,
    db_user,
    db_pass,
    {
        host: db_host,
        port: db_port,
        dialect: 'mysql',
        // logging: console.log,
        timezone: '-03:00',
        dialectOptions: {
            dateStrings: true,
            typeCast: true,
        },
    }
);

