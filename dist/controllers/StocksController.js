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
const express_1 = require("express");
const StocksService_1 = __importDefault(require("./../services/StocksService"));
class StocksController {
    constructor() {
        this.stockService = new StocksService_1.default();
        this.getRoutes = () => {
            return this.router;
        };
        this.getStocks = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                let response;
                const names = (_b = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.names) === null || _b === void 0 ? void 0 : _b.split(",");
                if (names && names.length > 0) {
                    response = yield this.stockService.getStocksByNames(names);
                }
                else {
                    response = yield this.stockService.getStocks();
                }
                return res.status(200).json(response);
            }
            catch (error) {
                console.log("StocksController", `get Error: ${error.message}`);
                next(error);
            }
        });
        this.router = (0, express_1.Router)();
        this.router.get("/api/stocks", (req, res, next) => this.getStocks(req, res, next));
    }
}
exports.default = StocksController;
