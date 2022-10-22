"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base = void 0;
const typeorm_1 = require("typeorm");
exports.base = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123123123",
    database: "WebMonsters",
    entities: ["Entities/*.entity.{.js,.ts}"],
    logging: true,
    synchronize: true,
    migrationsTableName: "migrations",
    migrations: ["Migrations/*{.js,.ts}"],
};
const dataSource = new typeorm_1.DataSource(exports.base);
exports.default = dataSource;
