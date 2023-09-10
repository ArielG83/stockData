import redis from "../database/Redis";
import { Stock, Stocks } from "../models/Stock";
import { redisKeys } from "../config/Constants";
import StocksRepository from "../repositories/StocksRepository";
import StocksDBRepository from "../repositories/StocksDBRepository";

export default class StocksService {
  redisClient = redis.getClient();
  stocksRepository = new StocksRepository();
  stocksDBRepository = new StocksDBRepository();

  init = async () => {
    this.getStocksFromFile();
    this.getStocksFromPostgresDB();
  };

  //get all stocks from stocks state
  getStocks = async (): Promise<Stocks> => {
    const value: string = (await this.redisClient.get(redisKeys.STOCKS)) || "";
    if (value) {
      const stocks: Stocks = JSON.parse(value);
      return stocks;
    }
    return {};
  };

  //get named stocks from stocks state
  getStocksByNames = async (
    stocksArr: string[]
  ): Promise<object | undefined> => {
    const stocks: Stocks = {};
    const stocksAll: Stocks = await this.getStocks();
    for (let i: number = 0; i < stocksArr.length; i++) {
      const stockName: string = stocksArr[i].toUpperCase();
      const stock: Stock = stocksAll[stockName];
      if (stock) {
        stocks[stock.name] = stock;
      }
    }
    return stocks;
  };

  private setStocks = async (stocksArr: Stock[]): Promise<void> => {
    let stocks: Stocks = (await this.getStocks()) || {};

    //get stocks array update and convert it to collection
    for (let stock of stocksArr) {
      stocks = this.updateStocksCollection(stock, stocks);
    }

    //push updated stocks collection to redis
    const stocksStr: string = JSON.stringify(stocks);
    await this.redisClient.set(redisKeys.STOCKS, stocksStr);
  };

  private updateStocksCollection = (value: Stock, stocks: Stocks): Stocks => {
    let stockExist = false;
    for (const stockKey in stocks) {
      // check that stock exist and timestemp is newer then exsting one
      if (stockKey === value.name && stocks[stockKey].date < value.date) {
        stocks[value.name] = value;
        stockExist = true;
        break;
      }
    }

    // if stock doesnt exist add it
    if (!stockExist) {
      stocks[value.name] = value;
    }

    return stocks;
  };

  //retrieve stocks from json file and update stocks state
  public getStocksFromFile = () => {
    console.log("getStocksFromFile");
    const stocksArr: Stock[] = this.stocksRepository.getStocksFromFile();
    this.setStocks(stocksArr);
  };

  //retrieve stocks from AWS json and update stocks state
  public getStocksFromAWS = async () => {
    console.log("getStocksFromAWS");
    const stocksArr: Stock[] = await this.stocksRepository.getStocksFromAWS();
    this.setStocks(stocksArr);
  };

  //retrieve stocks from PostgresDB and update stocks state
  public getStocksFromPostgresDB = async () => {
    console.log("getStocksFromPostgresDB");
    const stocksArr: Stock[] = await this.stocksDBRepository.findAllStocks();
    this.setStocks(stocksArr);
  };
}
