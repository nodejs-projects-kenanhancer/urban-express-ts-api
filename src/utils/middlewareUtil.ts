import {NextHandleFunction} from "../httpServer";
import {Request, Response} from "express";

export function asyncHandler(fn: NextHandleFunction) {
    return (request: Request, response: Response, next: any) =>
        Promise
            .resolve(fn(request, response, next))
            .then(async (val: any) => val && await val())
            .catch(next);
}