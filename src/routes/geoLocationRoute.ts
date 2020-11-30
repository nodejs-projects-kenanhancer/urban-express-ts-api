import {IRouter, Request, Response, Router} from "express";
import {NextHandleFunction} from "../httpServer";
import {GeoLocationController, IGeoLocationController} from "../controllers";
import {asyncHandler} from "../utils";
import {geoLocationValidatorMiddleware} from "../middlewares";
import {geoLocationMongoCacheMiddleware} from "../middlewares/geoLocationMongoCacheMiddleware";
import {LocationMongoRepository} from "../repositories";

export function geoLocationRoute(): NextHandleFunction {

    const mongoCache: LocationMongoRepository = new LocationMongoRepository();

    const router: IRouter = Router();
    const geoLocationController: IGeoLocationController = new GeoLocationController();

    router.get("/geolocation/:address",
        geoLocationValidatorMiddleware(),
        // geoLocationRedisCacheMiddleware(),
        geoLocationMongoCacheMiddleware(),
        asyncHandler(async (request: Request, response: Response, next: any): Promise<void> => {
            const address: string = request.params.address;

            const res: any = await geoLocationController.search(address);

            response.locals.response = res;

            response.send(res);

            // next();

            return next;
        }),
        async (request: Request, response: Response, next: any): Promise<void> => {

            await mongoCache.save(response.locals.response);
        });

    return router;

}