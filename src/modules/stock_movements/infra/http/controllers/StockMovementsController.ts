import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateStockMovementService from '@modules/stock_movements/services/CreateStockMovementService';
import ListStockMovementsService from '@modules/stock_movements/services/ListStockMovementsService';
import ListAllStockMovementsService from '@modules/stock_movements/services/ListAllStockMovementsService';

export default class StockMovementsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { product_id, type, quantity, reason, supplier_id, client_id } =
      request.body;

    const createStockMovement = container.resolve(CreateStockMovementService);

    const stockMovement = await createStockMovement.execute({
      product_id,
      type,
      quantity,
      reason,
      supplier_id,
      client_id,
    });

    return response.status(201).json(stockMovement);
  }

  public async listAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listAllStockMovements = container.resolve(
      ListAllStockMovementsService,
    );

    const movements = await listAllStockMovements.execute();

    return response.json(movements);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { product_id } = request.params;

    const listStockMovements = container.resolve(ListStockMovementsService);

    const movements = await listStockMovements.execute({
      product_id,
    });

    return response.json(movements);
  }
}
