import {BaseError} from "../errors/baseError";
import {ApplicationError, BadRequestError, DownstreamError, InternalServerError, NotFoundError} from "../errors";

export class Errors {
    static INTERNAL_SERVER_ERROR: (message?: string, error?: any) => BaseError = (message?: string, error?: any) => new InternalServerError("INTERNAL_SERVER_ERROR", message || "Something happened :(", error);

    static DOWNSTREAM_ERROR: BaseError = new DownstreamError("DOWNSTREAM_ERROR", "Downstream service not working!");

    static PORT_NOT_DEFINED: BaseError = new ApplicationError("PORT_NOT_DEFINED", "PORT is not defined in .env file");

    static CACHE_DATASOURCE_NOT_DEFINED: BaseError = new ApplicationError("CACHE_DATASOURCE_NOT_DEFINED", "CACHE_DATASOURCE is not defined in .env file");

    static CACHE_DATASOURCE_CONFIG_NOT_FOUND: (dsName: string, error?: any) => BaseError = (dsName: string, error?: any) => new ApplicationError("CACHE_DATASOURCE_CONFIG_NOT_FOUND", `${dsName} cache datasource config is not found in ./src/datasourcesConfig.json file`, error);

    static GOOGLE_API_KEY_NOT_DEFINED: BaseError = new ApplicationError("GOOGLE_API_KEY_NOT_DEFINED", "GOOGLE_API_KEY is not defined in .env file");

    static ADDRESS_NOT_VALID: BaseError = new BadRequestError("ADDRESS_NOT_VALID", "address parameter is not valid");

    static NON_EXISTING_ADDRESS: BaseError = new NotFoundError("NOT_FOUND", "Non-existing address");
}