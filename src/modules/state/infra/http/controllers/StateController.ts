import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DetailStateService from '@modules/state/services/DetailStateService';
import ListStateService from '@modules/state/services/ListStateService';

export default class ProductsController {
  public async detail(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const detailState = container.resolve(DetailStateService);

    const state = await detailState.execute({
      state_id: id,
    });

    return response.json(state);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listState = container.resolve(ListStateService);

    const categories = await listState.execute();

    return response.json(categories);
  }
}
