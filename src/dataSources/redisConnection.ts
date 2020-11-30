import {DatasourceConnection} from "./datasourceConnection";
import redis, {RedisClient} from "redis";
import {DataSourceConfigRecord} from "./dataSourceConfigRecord";

export class RedisConnection implements DatasourceConnection {
    readonly url: string;

    private _connection: RedisClient | null = null;

    constructor(config: DataSourceConfigRecord) {
        this.url = `redis://${config.host}:${config.port}/${config.database}`;
    }

    get connection(): any {
        return this._connection;
    }

    async connect(): Promise<any> {
        this._connection = await redis.createClient(this.url);

        console.log('Redis connected:', this.url)

        return this._connection;
    }
}