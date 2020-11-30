import {BaseError} from "../baseError";

export class InternalServerError implements BaseError {
    public name: string = "InternalServerError";

    public statusCode: number = 500;

    constructor(public code: string, public message: string, public error?: any) {
    }
}