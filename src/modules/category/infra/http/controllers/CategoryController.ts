import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCategoryService from '@modules/category/services/CreateCategoryService';
import DetailCategoryService from '@modules/category/services/DetailCategoryService';
import UpdateCategoryService from '@modules/category/services/UpdateCategoryService';
import DeleteCategoryService from '@modules/category/services/DeleteCategoryService';
import ListCategoryService from '@modules/category/services/ListCategoryService';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createCategory = container.resolve(CreateCategoryService);

    const category = await createCategory.execute({
      name,
    });

    return response.json(category);
  }

  public async detail(request: Request, response: Response): Promise<Response> {
    const category_id = request.params.id;

    const detailCategory = container.resolve(DetailCategoryService);

    const category = await detailCategory.execute({
      category_id,
    });

    return response.json(category);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listCategory = container.resolve(ListCategoryService);

    const categories = await listCategory.execute();

    return response.json(categories);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const category_id = request.params.id;

    const updateCategory = container.resolve(UpdateCategoryService);

    const category = await updateCategory.execute({
      name,
      category_id,
    });

    return response.json(category);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const category_id = request.params.id;

    const deleteCategory = container.resolve(DeleteCategoryService);

    const category = await deleteCategory.execute({
      category_id,
    });

    return response.json(category);
  }
}
