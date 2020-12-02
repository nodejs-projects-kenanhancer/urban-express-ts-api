import {Errors} from "../constants";
import {NextHandleFunction} from "../httpServer";

export function geoLocationValidatorMiddleware(): NextHandleFunction {

    const middleware: NextHandleFunction = (request: any, response: any, next: any): void => {
        if (!request.params.address) {
            throw Errors.ADDRESS_NOT_VALID;
        }

        next();
    };

    return middleware;
}