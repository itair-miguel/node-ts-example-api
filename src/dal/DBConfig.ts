import { Dialect } from "sequelize";
import { SequelizeOptions, Sequelize } from "sequelize-typescript";
import { Logger } from "../config/Logger";

export const DBConfig = (): SequelizeOptions => {
    return {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        dialect: process.env.DB_DIALECT as Dialect,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        dialectOptions: {
            encrypt: true,
        },
        pool: {
            max: 30,
            min: 0,
            idle: 30000,
            acquire: 30000,
            evict: 30000,
        },
        logging: (msg: any) => Logger.debug(msg),
    };
};

interface IDBInstance {
    sequelize: Sequelize;
}

class DBInstance implements IDBInstance {
    public sequelize: Sequelize;
}

const db: IDBInstance = new DBInstance();

let initialized: boolean = false;

export const SetupDB = (): IDBInstance => {
    if (initialized && db.sequelize != null) {
        return db;
    }

    initializeDb(DBConfig());
    initialized = true;

    return db;
};

/**
 * Function responsible for initializing the DB instance.
 *
 * @param dbConfig database configuration object
 */
const initializeDb = (dbConfig?: SequelizeOptions): void => {
    if (!dbConfig) {
        throw new Error("dbConfig should not be null on initialization process.");
    }
    const sequelize: Sequelize = new Sequelize(dbConfig);
    sequelize.addModels(["./models"]);

    db.sequelize = sequelize;
};
