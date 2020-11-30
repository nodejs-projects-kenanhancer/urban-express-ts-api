import {setupDatasources, validateTokens} from "./boot"
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import {ExpressHttpServer, HttpServer} from "./httpServer";
import {appErrorMiddleware} from "./middlewares";
import {geoLocationRoute} from "./routes";
import http from "http";

const mainAsync: () => Promise<http.Server> = async (): Promise<http.Server> => {
    validateTokens();

    await setupDatasources();

    const PORT: number = parseInt(process.env.PORT as string, 10);

    console.log(PORT);

    const httpServer: HttpServer = new ExpressHttpServer(PORT);

    return httpServer
        .useMiddleware(bodyParser.json()) // using bodyParser to parse JSON bodies into JS objects
        .useMiddleware(bodyParser.urlencoded({extended: true})) // support application/x-www-form-urlencoded post data
        .useMiddleware(cors()) // enabling CORS(Cross-origin resource sharing) for all requests
        .useMiddleware(helmet()) // adding Helmet to enhance your API's security
        .useRoute("/urban/api", geoLocationRoute())
        .useMiddleware(appErrorMiddleware())
        .onClose(() => console.log('Http server closed.'))
        .onListening(() => console.log(`Listening on port ${PORT}`))
        .listen();
}

mainAsync();
