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
const express_1 = __importDefault(require("express"));
const node_cron_1 = __importDefault(require("node-cron"));
const dotenv_1 = __importDefault(require("dotenv"));
const StocksController_1 = __importDefault(require("./controllers/StocksController"));
const StocksService_1 = __importDefault(require("./services/StocksService"));
require("reflect-metadata");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const stocksService = new StocksService_1.default();
const stocksController = new StocksController_1.default();
app.get("/", (req, res) => res.send("Ok"));
app.use(stocksController.getRoutes());
// cronjob for aws json every 10  sec
node_cron_1.default.schedule("*/10 * * * * *", () => {
    console.log("--------------------- running a task every 10 seconds");
    stocksService.getStocksFromAWS();
});
// cronjob for json file every 3 hours
node_cron_1.default.schedule("0 */3 * * * *", () => {
    console.log("--------------------- running a task every 3 hours");
    stocksService.getStocksFromFile();
});
// error handler
app.use((err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`error handler`, err.message);
    res.status(500).send("Internal Server Error");
}));
process.on("uncaughtException", (err) => {
    console.log(`error handler`, err.message);
});
process.on("unhandledRejection", (err) => {
    console.log(`error handler`, err.message);
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    stocksService.init();
});
