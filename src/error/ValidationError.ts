import { BaseError } from "./BaseError";

/**
 * Error returned to the client in case the user input fails to pass validation
 *
 * @export
 * @class ValidationError
 * @extends {BaseError}
 */
export class ValidationError extends BaseError {

    constructor(message: string, code: string) {
        super(message, code, ValidationError.prototype);
    }

}