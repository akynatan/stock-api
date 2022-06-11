import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateModelService from '@modules/model/services/CreateModelService';
import DetailModelService from '@modules/model/services/DetailModelService';
import UpdateModelService from '@modules/model/services/UpdateModelService';
import DeleteModelService from '@modules/model/services/DeleteModelService';
import ListModelService from '@modules/model/services/ListModelService';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createModel = container.resolve(CreateModelService);

    const model = await createModel.execute({
      name,
    });

    return response.json(model);
  }

  public async detail(request: Request, response: Response): Promise<Response> {
    const model_id = request.params.id;

    const detailModel = container.resolve(DetailModelService);

    const model = await detailModel.execute({
      model_id,
    });

    return response.json(model);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listModel = container.resolve(ListModelService);

    const categories = await listModel.execute();

    return response.json(categories);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const model_id = request.params.id;

    const updateModel = container.resolve(UpdateModelService);

    const model = await updateModel.execute({
      name,
      model_id,
    });

    return response.json(model);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const model_id = request.params.id;

    const deleteModel = container.resolve(DeleteModelService);

    const model = await deleteModel.execute({
      model_id,
    });

    return response.json(model);
  }
}
