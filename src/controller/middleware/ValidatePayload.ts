// This wraps errors to guarantee that they are going to be catched and handled

import { NextFunction, Request, Response } from "express";

// by the app's global error handler
const wrap = (fn: any) => (...args: any[]) => fn(...args).catch(args[2]);

export const ValidateUserPayload = wrap((req: Request, res: Response, next: NextFunction) => {
    const user = req.body;
    if (user.email) {
        // TODO: Validate user email
    }
});
