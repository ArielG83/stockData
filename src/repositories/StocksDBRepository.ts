import { AppDataSource } from "../database/ormconfig";
import { Stock } from "../models/Stock";
import { repository } from "../config/Constants";
import "reflect-metadata";

export default class StocksDBRepository {
  async findAllStocks() {
    const stockRepository = AppDataSource.getRepository(Stock);
    const allStocks: Stock[] = await stockRepository.find();
    console.log("All photos from the db: ", allStocks);
    return allStocks;
  }
}
