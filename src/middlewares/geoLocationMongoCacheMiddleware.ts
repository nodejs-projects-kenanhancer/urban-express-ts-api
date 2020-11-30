import {NextHandleFunction} from "../httpServer";
import {LocationMongoRepository} from "../repositories/locationMongoRepository";
import {asyncHandler} from "../utils";

const mongoCache: LocationMongoRepository = new LocationMongoRepository();

export function geoLocationMongoCacheMiddleware(): NextHandleFunction {

    const middleware: NextHandleFunction = asyncHandler(async (request: any, response: any, next: any): Promise<void> => {
        const address: string = request.params.address;

        const item: any = await mongoCache.findOne(address);

        if (item) {
            response.send(item);
        } else {
            return next;
        }
    });

    return middleware;

}