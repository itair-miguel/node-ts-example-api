import { BaseError } from "./BaseError";

/**
 * Error returned to the client in case the system fails to find the requested resource
 *
 * @export
 * @class ResourceNotFoundError
 * @extends {BaseError}
 */
export class ResourceNotFoundError extends BaseError {

    constructor(message: string, code: string) {
        super(message, code, ResourceNotFoundError.prototype);
    }

}