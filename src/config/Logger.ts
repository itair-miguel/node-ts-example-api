import * as winston from "winston";

export const Logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console(),
    ]
});
