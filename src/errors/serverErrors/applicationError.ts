import {BaseError} from "../baseError";

export class ApplicationError implements BaseError {
    public name: string = "ApplicationError";

    public statusCode: number = 0;

    constructor(public code: string, public message: string, public error?: any) {
    }
}