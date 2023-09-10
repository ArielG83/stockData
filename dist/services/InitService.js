"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StocksService_1 = __importDefault(require("./../services/StocksService"));
class InitService {
    constructor() {
        this.stocksService = new StocksService_1.default();
        this.stocksService.getStocksFromFile();
    }
}
exports.default = InitService;
