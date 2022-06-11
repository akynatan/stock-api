import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DetailCityService from '@modules/city/services/DetailCityService';
import ListCityService from '@modules/city/services/ListCityService';

export default class ProductsController {
  public async detail(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const detailCity = container.resolve(DetailCityService);

    const city = await detailCity.execute({
      city_id: id,
    });

    return response.json(city);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listCity = container.resolve(ListCityService);

    const categories = await listCity.execute();

    return response.json(categories);
  }
}
