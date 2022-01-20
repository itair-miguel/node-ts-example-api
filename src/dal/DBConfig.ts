import { SequelizeOptions, Sequelize } from "sequelize-typescript";
import { Logger } from "../config/Logger";

export const DBConfig = (): SequelizeOptions => {
    return {
        storage: process.env.DB_STORAGE,
        dialect: "sqlite",
        logging: (msg: string) => Logger.debug(msg),
    };
};

interface IDBInstance {
    sequelize: Sequelize;
}

class DBInstance implements IDBInstance {
    public sequelize: Sequelize;
}

const db: IDBInstance = new DBInstance();

let initialized = false;

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
