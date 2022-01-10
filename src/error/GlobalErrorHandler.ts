import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Logger } from "../config/Logger";
import { EnvelopeResponse } from "../controller/envelope/EnvelopeResponse";
import { AuthenticationError } from "./AuthenticationError";

/**
 * Map that MUST CONTAIN all the errors that are returned to the client and their
 * SPECIFIC status code to be returned.
 */
const errorMap: Map<string, number> = new Map<string, number>();
errorMap.set(AuthenticationError.name, StatusCodes.UNAUTHORIZED);

/**
 * Function responsible for handling the correct return of all expected ERROR messages to clients.
 *
 * @param err ERROR to be returned
 * @param req REQUEST express object
 * @param res RESPONSE express object
 * @param next NEXT express method to be called
 */
export const GlobalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let errorName: string;
    if (Array.isArray(err)) {
        errorName = err[0].constructor.name;
    } else {
        errorName = err.constructor.name;
    }
    const status: number = errorMap.get(errorName) || err.status || StatusCodes.INTERNAL_SERVER_ERROR;
    Logger.error(err.message, err.stack ? err.stack : err);
    res.status(status).send(envelope(err));
};

/**
 * Function that envelopes an array of errors.
 *
 * @param errors Errors to be enveloped.
 */
const envelope = (errors: Error[]): EnvelopeResponse => {
    return EnvelopeResponse.createErrorMessage(errors);
};
