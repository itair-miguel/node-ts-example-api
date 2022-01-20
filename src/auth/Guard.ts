import { NextFunction, Request, Response } from "express";
import { injectable } from "inversify";
import { AuthenticationError } from "../error/AuthenticationError";
import { ERROR_CODE } from "../error/ERROR_CODE";

@injectable()
export class Guard {

    public async authenticate(req: Request, res: Response, next: NextFunction) {
        const username = req.get("auth-username");
        const pwd = req.get("auth-pwd");

        if (!username || !pwd) {
            throw new AuthenticationError("Access denied. No credentials provided.", ERROR_CODE.MISSING_CREDENTIALS);
        }

        const user = null;

        if (!user) {
            throw new AuthenticationError("Access denied. No credentials provided.", ERROR_CODE.INVALID_CREDENTIALS);
        }

        req.body.authenticated_user = user;

        next();
    }

}
