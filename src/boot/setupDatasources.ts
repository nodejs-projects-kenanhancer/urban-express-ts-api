import {Errors} from "../constants";
import datasourcesConfig from "../datasourcesConfig.json";
import {MongoConnection, RedisConnection} from "../dataSources";

export async function setupDatasources(): Promise<void> {
    const [, dsConfig]: any = Object.entries(datasourcesConfig).find(([key, value]) => key === process.env.CACHE_DATASOURCE);

    if (!dsConfig) {
        throw Errors.CACHE_DATASOURCE_CONFIG_NOT_FOUND(process.env.CACHE_DATASOURCE as string);
    }

    if (dsConfig.type === "redis") {
        const redisCon: RedisConnection = new RedisConnection(dsConfig);

        const connection: any = await redisCon.connect();
    } else if (dsConfig.type === "mongo") {
        const mongoCon: MongoConnection = new MongoConnection(dsConfig);

        await mongoCon.connect();
    }
}