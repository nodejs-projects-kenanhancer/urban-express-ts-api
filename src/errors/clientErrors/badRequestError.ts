import {BaseError} from "../baseError";

export class BadRequestError implements BaseError {

    public name: string = "BadRequestError";

    public statusCode: number = 400;

    constructor(public code: string, public message: string, public error?: any) {
    }
}