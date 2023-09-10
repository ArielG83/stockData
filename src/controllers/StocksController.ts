import { NextFunction, Router, Request, Response } from "express";
import StocksService from "./../services/StocksService";

export default class StocksController {
  stockService = new StocksService();
  private router: Router;

  constructor() {
    this.router = Router();
    this.router.get("/api/stocks", (req, res, next) =>
      this.getStocks(req, res, next)
    );
  }

  getRoutes = (): Router => {
    return this.router;
  };

  getStocks = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    try {
      let response;
      const names: string[] = (req?.query?.names as string)?.split(",");
      if (names && names.length > 0) {
        response = await this.stockService.getStocksByNames(names);
      } else {
        response = await this.stockService.getStocks();
      }

      return res.status(200).json(response);
    } catch (error: any) {
      console.log("StocksController", `get Error: ${error.message}`);
      next(error);
    }
  };
}
