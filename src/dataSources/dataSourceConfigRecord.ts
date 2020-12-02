type ConfigFields =
    "name"
    | "type"
    | "host"
    | "port"
    | "database"
    | "user"
    | "password"
    | "useNewUrlParser"
    | "useUnifiedTopology"
    | "useCreateIndex";

export type DataSourceConfigRecord = Partial<Record<ConfigFields, any>>;