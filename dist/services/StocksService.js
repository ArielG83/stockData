"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Redis_1 = __importDefault(require("../database/Redis"));
const Constants_1 = require("../config/Constants");
const StocksRepository_1 = __importDefault(require("../repositories/StocksRepository"));
const StocksDBRepository_1 = __importDefault(require("../repositories/StocksDBRepository"));
class StocksService {
    constructor() {
        this.redisClient = Redis_1.default.getClient();
        this.stocksRepository = new StocksRepository_1.default();
        this.stocksDBRepository = new StocksDBRepository_1.default();
        this.init = () => __awaiter(this, void 0, void 0, function* () {
            this.getStocksFromFile();
            this.getStocksFromPostgresDB();
        });
        //get all stocks from stocks state
        this.getStocks = () => __awaiter(this, void 0, void 0, function* () {
            const value = (yield this.redisClient.get(Constants_1.redisKeys.STOCKS)) || "";
            if (value) {
                const stocks = JSON.parse(value);
                return stocks;
            }
            return {};
        });
        //get named stocks from stocks state
        this.getStocksByNames = (stocksArr) => __awaiter(this, void 0, void 0, function* () {
            const stocks = {};
            const stocksAll = yield this.getStocks();
            for (let i = 0; i < stocksArr.length; i++) {
                const stockName = stocksArr[i].toUpperCase();
                const stock = stocksAll[stockName];
                if (stock) {
                    stocks[stock.name] = stock;
                }
            }
            return stocks;
        });
        this.setStocks = (stocksArr) => __awaiter(this, void 0, void 0, function* () {
            let stocks = (yield this.getStocks()) || {};
            //get stocks array update and convert it to collection
            for (let stock of stocksArr) {
                stocks = this.updateStocksCollection(stock, stocks);
            }
            //push updated stocks collection to redis
            const stocksStr = JSON.stringify(stocks);
            yield this.redisClient.set(Constants_1.redisKeys.STOCKS, stocksStr);
        });
        this.updateStocksCollection = (value, stocks) => {
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
        this.getStocksFromFile = () => {
            console.log("getStocksFromFile");
            const stocksArr = this.stocksRepository.getStocksFromFile();
            this.setStocks(stocksArr);
        };
        //retrieve stocks from AWS json and update stocks state
        this.getStocksFromAWS = () => __awaiter(this, void 0, void 0, function* () {
            console.log("getStocksFromAWS");
            const stocksArr = yield this.stocksRepository.getStocksFromAWS();
            this.setStocks(stocksArr);
        });
        //retrieve stocks from PostgresDB and update stocks state
        this.getStocksFromPostgresDB = () => __awaiter(this, void 0, void 0, function* () {
            console.log("getStocksFromPostgresDB");
            const stocksArr = yield this.stocksDBRepository.findAllStocks();
            this.setStocks(stocksArr);
        });
    }
}
exports.default = StocksService;
