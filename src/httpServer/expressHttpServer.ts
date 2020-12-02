import express from "express";
import * as http from "http";
import {CallbackFunction, HandleFunction, NextHandleFunction} from "./base/handleType";
import {HttpServer} from "./base";

class ExpressHttpServer implements HttpServer {
    private readonly _app: express.Application;
    private onCloseCallback?: CallbackFunction;
    private onConnectionCallback?: CallbackFunction;
    private onErrorCallback?: CallbackFunction;
    private onListeningCallback?: CallbackFunction;

    constructor(public readonly port: number) {
        this._app = express();
    }

    get app(): any {
        return this._app;
    }

    public get(name: string): any {
        return this._app.get(name);
    }

    public set(name: string, value: any): this {
        this._app.set(name, value);

        return this;
    }

    public useMiddleware(handler: HandleFunction): this {
        this._app.use(handler);

        return this;
    }

    public useRoute(path: string, handler: NextHandleFunction): this {
        this._app.use(path, handler);

        return this;
    }

    public onClose(callback: CallbackFunction): this {
        this.onCloseCallback = callback;

        return this;
    }

    public onConnection(callback: CallbackFunction): this {
        this.onConnectionCallback = callback;

        return this;
    }

    public onError(callback: CallbackFunction): this {
        this.onErrorCallback = callback;

        return this;
    }

    public onListening(callback: CallbackFunction): this {
        this.onListeningCallback = callback;

        return this;
    }

    public listen(callback?: CallbackFunction): http.Server {
        const server: http.Server = this._app.listen(this.port, callback);

        if (this.onCloseCallback) {
            server.on("close", this.onCloseCallback);
        }

        if (this.onConnectionCallback) {
            server.on("connection", this.onConnectionCallback);
        }

        if (this.onErrorCallback) {
            server.on("error", this.onErrorCallback);
        }

        if (this.onListeningCallback) {
            server.on("listening", this.onListeningCallback);
        }

        return server;
    }
}

export {ExpressHttpServer};