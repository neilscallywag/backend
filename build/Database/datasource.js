"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const ormconfig_1 = require("./ormconfig");
///////////////////////////////////////
// Although the structure here works.
// I would prefer to change it to a configuration style where i import configuration
// then pass it to the DataSource class during exportation
//
// eg. export const appDataSource = new DataSource(config)
//////////////////////////////////////
const dataSource = new typeorm_1.DataSource(ormconfig_1.base);
exports.default = dataSource;
