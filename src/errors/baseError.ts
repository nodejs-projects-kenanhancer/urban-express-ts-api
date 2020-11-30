export interface BaseError {
    name: string;

    code: string;

    message: string;

    statusCode: number;

    error?: any;
}