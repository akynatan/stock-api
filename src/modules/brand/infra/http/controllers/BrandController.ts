import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateBrandService from '@modules/brand/services/CreateBrandService';
import DetailBrandService from '@modules/brand/services/DetailBrandService';
import UpdateBrandService from '@modules/brand/services/UpdateBrandService';
import DeleteBrandService from '@modules/brand/services/DeleteBrandService';
import ListBrandService from '@modules/brand/services/ListBrandService';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createBrand = container.resolve(CreateBrandService);

    const brand = await createBrand.execute({
      name,
    });

    return response.json(brand);
  }

  public async detail(request: Request, response: Response): Promise<Response> {
    const brand_id = request.params.id;

    const detailBrand = container.resolve(DetailBrandService);

    const brand = await detailBrand.execute({
      brand_id,
    });

    return response.json(brand);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listBrand = container.resolve(ListBrandService);

    const categories = await listBrand.execute();

    return response.json(categories);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const brand_id = request.params.id;

    const updateBrand = container.resolve(UpdateBrandService);

    const brand = await updateBrand.execute({
      name,
      brand_id,
    });

    return response.json(brand);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const brand_id = request.params.id;

    const deleteBrand = container.resolve(DeleteBrandService);

    const brand = await deleteBrand.execute({
      brand_id,
    });

    return response.json(brand);
  }
}
