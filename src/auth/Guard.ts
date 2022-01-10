import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../config/Types";
import { AuthenticationError } from "../error/AuthenticationError";
import { ERROR_CODE } from "../error/ERROR_CODE";
import { AuthService } from "../service/AuthService";

@injectable()
export class Guard {

    @inject(TYPES.AuthService)
    private service: AuthService;

    public async authenticate(req: Request, res: Response, next: NextFunction) {
        const username = req.get("auth-username");
        const pwd = req.get("auth-pwd");

        if (!username || !pwd) {
            throw new AuthenticationError("Access denied. No credentials provided.", ERROR_CODE.MISSING_CREDENTIALS);
        }

        const user = await this.service.basicAuth(username, pwd);

        if (!user) {
            throw new AuthenticationError("Access denied. No credentials provided.", ERROR_CODE.INVALID_CREDENTIALS);
        }

        req.body.authenticated_user = user;

        next();
    }

}
