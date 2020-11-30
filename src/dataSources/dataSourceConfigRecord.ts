type ConfigFields = "name" | "type" | "host" | "port" | "database" | "user" | "password" | "useNewUrlParser";

export type DataSourceConfigRecord = Partial<Record<ConfigFields, any>>;