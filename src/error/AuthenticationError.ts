import { BaseError } from "./BaseError";

/**
 * Error returned to the client in case it fails the Authorization process.
 *
 * @export
 * @class AuthenticationError
 * @extends {BaseError}
 */
export class AuthenticationError extends BaseError {

    constructor(message: string, code: string) {
        super(message, code, AuthenticationError.prototype);
    }

}