// !! THIS IMPORT NEEDS TO BE THE FIRST ONE OR IT WILL BREAK InversifyJS !!
// ----------------------------------------------------------------- //
import * as fs from "fs";
import { getRouteInfo, InversifyExpressServer } from "inversify-express-utils";
import "reflect-metadata";
import App from "./app";
import { Guard } from "./auth/Guard";
import { Logger } from "./config/Logger";
import { TYPES } from "./config/Types";
import { GlobalErrorHandler } from "./error/GlobalErrorHandler";
import { container } from "./inversify.config";

/**
 * Creates the server instance.
 *
 * @class Server
 */
class Server {

    private static readonly basePath: string = "/" + process.env.KARIE_API_VERSION;
    private static readonly LOG_DIR: string = "logs";

    /**
     * Starts the server assigning routes using IOC with InversifyJS and inversify-express-utils.
     *
     * @static
     * @memberof Server
     */
    public static start(): void {
        const serverInstance = new InversifyExpressServer(container, null, { rootPath: Server.basePath }, App);

        this.debugMod();

        // AUTHORIZATION and/or AUTHENTICATION PROCESS CAN BE SETUP HERE GLOBALLY TO RUN BEFORE EVERY API REQUEST RECEIVED
        serverInstance.setConfig((app) => {
            app.use((req, res, next) => {
                const guard: Guard = container.get(TYPES.Guard);
                guard.authenticate(req, res, next)
                    .catch((error) => {
                        next(error);
                    });
            });
        });

        serverInstance.setErrorConfig((app) => {
            app.use((req, res, next) => {
                res.status(404);
                res.send("Path does not exist.");
            });
            app.use(GlobalErrorHandler);
        });

        const application = serverInstance.build();

        if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
            const routeInfo = getRouteInfo(container);
            Logger.info({ routes: routeInfo });
        }
        const port = process.env.API_PORT;
        application.listen(port,
            () => Logger.info(`listening on host: ${process.env.API_HOST} port: ${port}`));
    }

    private static debugMod(): void {
        if (!fs.existsSync(Server.LOG_DIR)) {
            // Create the directory if it does not exist
            fs.mkdirSync(Server.LOG_DIR);
        }
    }
}

export const server = Server.start();
