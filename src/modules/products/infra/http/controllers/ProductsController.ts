import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DetailProductService from '@modules/products/services/DetailProductService';
import CreateProductService from '@modules/products/services/CreateProductService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import ListProductsService from '@modules/products/services/ListProductsService';
import DeleteProductService from '@modules/products/services/DeleteProductService';
import { classToClass } from 'class-transformer';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      code,
      description,
      brand_id,
      model_id,
      category_id,
      manufacturer_id,
      measure_unit,
    } = request.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      name,
      code,
      description,
      brand_id,
      model_id,
      category_id,
      manufacturer_id,
      measure_unit,
    });

    return response.json(classToClass(product));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      name,
      code,
      description,
      brand_id,
      model_id,
      category_id,
      manufacturer_id,
      new_brand,
      new_model,
      new_category,
      new_manufacturer,
      measure_unit,
    } = request.body;

    const updateProduct = container.resolve(UpdateProductService);
    const product_id = request.params.id;

    const product = await updateProduct.execute({
      product_id,
      name,
      code,
      description,
      brand_id,
      model_id,
      category_id,
      manufacturer_id,
      new_brand,
      new_model,
      new_category,
      new_manufacturer,
      measure_unit,
    });

    return response.json(classToClass(product));
  }

  public async detailProduct(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const product_id = request.params.id;

    const detailProductService = container.resolve(DetailProductService);

    const product = await detailProductService.execute({
      product_id,
    });

    return response.json(classToClass(product));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = container.resolve(ListProductsService);
    const products = await listProducts.execute();

    return response.json(classToClass(products));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteProduct = container.resolve(DeleteProductService);

    const product_id = request.params.id;
    const product = await deleteProduct.execute({ product_id });

    return response.json(classToClass(product));
  }
}
