import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ToggleStatusProductService from '@modules/products/services/ToggleStatusProductService';

export default class ProductStatusController {
  public async update(request: Request, response: Response): Promise<Response> {
    const toggleStatusProduct = container.resolve(ToggleStatusProductService);
    const product_id = request.params.id;

    const product = await toggleStatusProduct.execute({
      product_id,
    });

    return response.json(classToClass(product));
  }
}
