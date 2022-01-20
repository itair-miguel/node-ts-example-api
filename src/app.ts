import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import * as express from "express";
import { Logger } from "./config/Logger";
import { SetupDB } from "./dal/DBConfig";

/**
 * Represents the Express APP and is responsible for handling most of the APP configuration
 *
 * @class App
 */
class App {

    public express: express.Application;

    constructor() {
        this.setEnvironment();
        this.express = express();
        this.database();
        this.middleware();
    }

    /**
     * database connection
     */
    private database() {
        const instance = SetupDB();
        const sync = process.env.DATABASE_MODEL_SYNC === undefined ? false : process.env.DATABASE_MODEL_SYNC === "true";
        if (!sync) {
            Logger.info("Database initialized");
        } else if (process.env.NODE_ENV === "development") {
            return instance.sequelize.sync().then(() => {
                Logger.info("Database initialized");
                return null;
            }).catch((err: Error) => {
                Logger.info("Database failed!");
                throw err;
            });
        }
    }

    /**
     * http(s) request middleware
     */
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.raw());
        this.express.use(bodyParser.urlencoded({ extended: true }));

        this.express.use((req, res, next) => {
            if (process.env.NODE_ENV === "development") {
                res.header("Access-Control-Allow-Origin", "*");
            }
            res.header("Access-Control-Allow-Methods", "OPTIONS,PUT,POST");
            res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
            if (req.method === "OPTIONS") {
                res.status(200).send();
            } else {
                next();
            }
        });
    }

    /**
     * app environment configuration
     */
    private setEnvironment(): void {
        process.env.NODE_ENV = process.env.NODE_ENV || "development";
        dotenv.config({ path: ".env" });
    }

}

export default new App().express;
