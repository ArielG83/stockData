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
Object.defineProperty(exports, "__esModule", { value: true });
const ormconfig_1 = require("../database/ormconfig");
const Stock_1 = require("../models/Stock");
require("reflect-metadata");
class StocksDBRepository {
    findAllStocks() {
        return __awaiter(this, void 0, void 0, function* () {
            const stockRepository = ormconfig_1.AppDataSource.getRepository(Stock_1.Stock);
            const allStocks = yield stockRepository.find();
            console.log("All photos from the db: ", allStocks);
            return allStocks;
        });
    }
}
exports.default = StocksDBRepository;
