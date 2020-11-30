import mongoose, {Connection} from 'mongoose';

import {DatasourceConnection} from "./datasourceConnection";
import {DataSourceConfigRecord} from "./dataSourceConfigRecord";

export class MongoConnection implements DatasourceConnection {
    readonly url: string;

    private _connection: Connection | null = null;

    constructor(private readonly config: DataSourceConfigRecord) {
        this.url = `mongodb://${config.host}:${config.port}/${config.database}`;
    }

    get connection(): any {
        return this._connection;
    }

    async connect(): Promise<any> {
        await mongoose.connect(this.url, {
            useNewUrlParser: this.config.useNewUrlParser,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        this._connection = mongoose.connection;

        console.log('MongoDB connected:', this.url)

        return this._connection;
    }
}