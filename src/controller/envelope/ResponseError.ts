export interface ErrorMessage {
    name?: string;
    code?: string;
    message?: string;
}

export interface ResponseError {
    errors: ErrorMessage[];
}
