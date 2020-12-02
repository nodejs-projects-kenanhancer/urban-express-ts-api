import * as dotenv from "dotenv";

dotenv.config({path: `.env${(process.env.NODE_ENV && `.${process.env.NODE_ENV}`) || ""}`});

import {setupDatasources, validateTokens} from "./boot";
import {httpServer} from "./server";

const mainAsync: () => Promise<void> = async (): Promise<void> => {
    validateTokens();

    await setupDatasources();

    httpServer.listen();
}

mainAsync();