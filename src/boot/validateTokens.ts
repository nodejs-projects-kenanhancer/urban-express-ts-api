import * as dotenv from "dotenv";

dotenv.config({path: `.env${(process.env.NODE_ENV && `.${process.env.NODE_ENV}`) || ""}`});

import {Errors} from "../constants";

export function validateTokens(): void {
    if (!process.env.PORT) {
        throw Errors.PORT_NOT_DEFINED;

        process.exit(1);
    } else if (!process.env.GOOGLE_API_KEY) {
        throw Errors.GOOGLE_API_KEY_NOT_DEFINED;

        process.exit(1);
    }
    if (!process.env.CACHE_DATASOURCE) {
        throw Errors.CACHE_DATASOURCE_NOT_DEFINED;

        process.exit(1);
    }
}