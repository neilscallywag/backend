import { join } from "path";
import { DataSource, DataSourceOptions } from "typeorm";

export const base = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "123123123",
  database: "WebMonsters",
  entities: [join(__dirname, "Entities", "*.entity{.js,.ts}")],
  logging: true,
  synchronize: false,
  migrationsTableName: "migrations", //Specify this option only if you need migration table name to be different from "migrations".
  migrations: ["Migrations/*{.js,.ts}"],
} as DataSourceOptions;

const dataSource = new DataSource(base);
export default dataSource;
