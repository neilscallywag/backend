import { DataSource } from "typeorm";
import { base } from "./ormconfig";

///////////////////////////////////////
// Although the structure here works.
// I would prefer to change it to a configuration style where i import configuration
// then pass it to the DataSource class during exportation
//
// eg. export const appDataSource = new DataSource(config)
//////////////////////////////////////

const dataSource = new DataSource(base);

export default dataSource;
