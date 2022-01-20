import "reflect-metadata";
import { getRouteInfo, InversifyExpressServer } from "inversify-express-utils";
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

    private static readonly basePath: string = "/" + process.env.API_VERSION;

    /**
     * Starts the server assigning routes using IOC with InversifyJS and inversify-express-utils.
     *
     * @static
     * @memberof Server
     */
    public static start(): void {
        const serverInstance = new InversifyExpressServer(container, null, { rootPath: Server.basePath }, App);

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
            app.use((req, res) => {
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
        application.listen(port, () => Logger.info(`listening on host: ${process.env.API_HOST} port: ${port}`));
    }

}

export const server = Server.start();
