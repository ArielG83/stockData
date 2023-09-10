import * as fs from "fs";
import axios from "axios";
import { Stock } from "../models/Stock";
import { repository } from "../config/Constants";

export default class StocksRepository {
  public getStocksFromFile(): Stock[] {
    let data: Stock[];
    try {
      const rawData = fs.readFileSync(repository.JSON_FILE, "utf8");
      return JSON.parse(rawData);
    } catch (error: any) {
      console.error("StocksRepository => Error reading JSON file:", error);
      throw error;
    }
  }

  public async getStocksFromAWS(): Promise<Stock[]> {
    try {
      const response = await axios.get(repository.JSON_AWS);
      return response.data;
    } catch (error: any) {
      console.error("StocksRepository => Error reading JSON file:", error);
      throw error;
    }
  }
}
