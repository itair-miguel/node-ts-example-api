export class BaseError extends Error {

    private code: string;

    constructor(message: string, code: string, proto: object) {
        super(message);
        this.code = code;
        Object.setPrototypeOf(this, proto);
    }

    public get $message(): string {
        return this.message;
    }

    public set $message(value: string) {
        this.message = value;
    }

    public get $code(): string {
        return this.code;
    }

    public set $code(value: string) {
        this.code = value;
    }

}
