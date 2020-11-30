import {Errors} from "../constants";
import {BaseError} from "../errors/baseError";
import {ErrorHandleFunction} from "../httpServer";

export function appErrorMiddleware(): ErrorHandleFunction {

    const middleware: ErrorHandleFunction = (err: any, req: any, res: any, next: any): void => {

        if (err.isOperational) {
            res.status(500).send(Errors.INTERNAL_SERVER_ERROR(err.message, err.stack));
            return;
        }

        const error: BaseError = err as BaseError || Errors.INTERNAL_SERVER_ERROR();

        res.status(error.statusCode).send({status: error.code, search: error.message});
    };

    return middleware;

}