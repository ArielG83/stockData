import "reflect-metadata";
import { DataSource } from "typeorm";
import { repository } from "../config/Constants";
import { Stock } from "../models/Stock";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "host.docker.internal",
  port: 5432,
  username: "username",
  password: "password",
  database: "stocks-db",
  synchronize: true,
  logging: true,
  entities: ["src/models/Stock.ts"],
  subscribers: [],
  migrations: [],
});

AppDataSource.initialize()
  .then(() => {
    // initiate stocks table
    AppDataSource.createQueryBuilder()
      .insert()
      .into(Stock)
      .values(repository.POSTGRES.INITIAL_VALUES)
      .execute();
  })
  .catch((error) => console.log(`Postgres initialize error:${error}`));
