import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateProductImageService from '@modules/products/services/UpdateProductImageService';

export default class ProductImageController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateProductImageService = container.resolve(
      UpdateProductImageService,
    );
    const product_id = request.params.id;

    const product = await updateProductImageService.execute({
      product_id,
      imageFileName: request.file.filename,
    });
    return response.json(classToClass(product));
  }
}
