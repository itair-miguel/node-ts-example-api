import { Envelope } from "./Envelope";
import { ErrorMessage, ResponseError } from "./ResponseError";

/**
 * Responsible for enveloping the responses to the client creating a formatted
 * way of comunication with API consumers.
 *
 * @export
 * @class EnvelopeResponse
 */
export class EnvelopeResponse {

    public static createMessage<T>(content: T): Envelope<T> {
        const envelope: Envelope<T> = {
            data: content,
        };
        return envelope;
    }

    public static createErrorMessage(content: Error[]): ResponseError {
        const envelope: ResponseError = {
            errors: [],
        };
        if (Array.isArray(content)) {
            for (const err of content) {
                envelope.errors.push(EnvelopeResponse.setError(err));
            }
        } else {
            envelope.errors.push(EnvelopeResponse.setError(content));
        }

        return envelope;
    }

    private static setError(error: any): ErrorMessage {
        const message: ErrorMessage = {};
        message.name = error.constructor.name;
        message.code = error.code;
        message.message = error.message;

        return message;
    }

}
