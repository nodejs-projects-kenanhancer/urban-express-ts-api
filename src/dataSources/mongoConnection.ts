import mongoose, {Connection, ConnectionStates} from 'mongoose';

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
        if (mongoose.connection.readyState === ConnectionStates.disconnected) {
            // mongoose.connect('mongodb://localhost:32768/test')
            //     .then(() => console.log('Db connected...'))
            //     .catch(e => console.log("Db connection error", e));

            await mongoose.connect(this.url, {
                useNewUrlParser: this.config.useNewUrlParser,
                useUnifiedTopology: this.config.useUnifiedTopology,
                useCreateIndex: this.config.useCreateIndex
            });
        }

        this._connection = mongoose.connection;

        console.log('MongoDB connected:', this.url)

        return this._connection;
    }
}