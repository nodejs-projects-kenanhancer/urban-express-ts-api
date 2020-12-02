import http from "http";
import {CallbackFunction, HandleFunction, NextHandleFunction} from "./handleType";

export interface HttpServer {
    app():any;

    get(name: string): any;

    set(name: string, value: any): this;

    useMiddleware(handler: HandleFunction): this;

    useRoute(path: string, handler: NextHandleFunction): this;

    onClose(callback: CallbackFunction): this;

    onConnection(callback: CallbackFunction): this;

    onError(callback: CallbackFunction): this;

    onListening(callback: CallbackFunction): this;

    listen(callback?: CallbackFunction): http.Server;
}