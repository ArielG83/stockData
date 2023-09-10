"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Postgres = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Constants_1 = require("../config/Constants");
const Stock_1 = require("../models/Stock");
exports.Postgres = new typeorm_1.DataSource({
    type: "postgres",
    host: "host.docker.internal",
    port: 5432,
    username: "admin",
    password: "admin",
    database: "database-name",
    synchronize: true,
    logging: true,
    entities: ["src/models/Stock.ts"],
    subscribers: [],
    migrations: [],
});
exports.Postgres.initialize()
    .then(() => {
    // initiate stocks table
    exports.Postgres.createQueryBuilder()
        .insert()
        .into(Stock_1.Stock)
        .values(Constants_1.repository.POSTGRES.INITIAL_VALUES)
        .execute();
})
    .catch((error) => console.log(`Postgres initialize error:${error}`));
