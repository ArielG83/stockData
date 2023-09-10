import express, { Express, Request, Response, NextFunction } from "express";
import cron from "node-cron";
import dotenv from "dotenv";
import StocksController from "./controllers/StocksController";
import StocksService from "./services/StocksService";
import "reflect-metadata";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const stocksService = new StocksService();
const stocksController = new StocksController();

app.get("/", (req: Request, res: Response) => res.send("Ok"));

app.use(stocksController.getRoutes());

// cronjob for aws json every 10  sec
cron.schedule("*/10 * * * * *", () => {
  console.log("--------------------- running a task every 10 seconds");
  stocksService.getStocksFromAWS();
});

// cronjob for json file every 3 hours
cron.schedule("0 */3 * * * *", () => {
  console.log("--------------------- running a task every 3 hours");
  stocksService.getStocksFromFile();
});

// error handler
app.use(async (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(`error handler`, err.message);
  res.status(500).send("Internal Server Error");
});

process.on("uncaughtException", (err: Error) => {
  console.log(`error handler`, err.message);
});

process.on("unhandledRejection", (err: Error) => {
  console.log(`error handler`, err.message);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  stocksService.init();
});
