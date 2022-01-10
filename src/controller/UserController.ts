import { NextFunction, Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpPut, interfaces } from "inversify-express-utils";
import { TYPES } from "../config/Types";
import { UserService } from "../service/UserService";

@controller("/user_auth/user")
export class UserController implements interfaces.Controller {

    @inject(TYPES.UserService)
    private userService: UserService;

    @httpPut("/")
    private async create(req: Request, res: Response, next: NextFunction) {
        // TODO: Add create user functionality
    }

}
