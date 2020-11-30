export interface DatasourceConnection {
    readonly url: string;
    readonly connection: any;

    connect(): Promise<any>;
}