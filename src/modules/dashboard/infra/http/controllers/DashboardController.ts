import { Request, Response } from 'express';
import { container } from 'tsyringe';

import StockLevelsService from '@modules/dashboard/services/StockLevelsService';
import ZeroStockService from '@modules/dashboard/services/ZeroStockService';
import MovementsSummaryService from '@modules/dashboard/services/MovementsSummaryService';
import EntriesBySupplierService from '@modules/dashboard/services/EntriesBySupplierService';
import ExitsByClientService from '@modules/dashboard/services/ExitsByClientService';

export default class DashboardController {
  public async stockLevels(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { start_date, end_date } = request.query;

    const stockLevelsService = container.resolve(StockLevelsService);

    const result = await stockLevelsService.execute({
      start_date: start_date as string,
      end_date: end_date as string,
    });

    return response.json(result);
  }

  public async zeroStock(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const zeroStockService = container.resolve(ZeroStockService);

    const result = await zeroStockService.execute();

    return response.json(result);
  }

  public async movementsSummary(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { start_date, end_date } = request.query;

    const movementsSummaryService = container.resolve(MovementsSummaryService);

    const result = await movementsSummaryService.execute({
      start_date: start_date as string,
      end_date: end_date as string,
    });

    return response.json(result);
  }

  public async entriesBySupplier(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const entriesBySupplierService = container.resolve(EntriesBySupplierService);

    const result = await entriesBySupplierService.execute();

    return response.json(result);
  }

  public async exitsByClient(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const exitsByClientService = container.resolve(ExitsByClientService);

    const result = await exitsByClientService.execute();

    return response.json(result);
  }
}
