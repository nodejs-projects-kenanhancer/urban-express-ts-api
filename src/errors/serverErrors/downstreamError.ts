import {InternalServerError} from "./internalServerError";

export class DownstreamError extends InternalServerError {
    constructor(code: string, message: string, error?: any) {
        super(code, message, error);

        this.name = "DownstreamError";
    }
}