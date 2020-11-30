import {BadRequestError} from "./badRequestError";

export class NotFoundError extends BadRequestError {
    constructor(code: string, message: string, error?: any) {
        super(code, message, error);

        this.name = "NotFoundError";
    }
}