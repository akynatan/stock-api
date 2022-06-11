import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateManufacturerService from '@modules/manufacturer/services/CreateManufacturerService';
import DetailManufacturerService from '@modules/manufacturer/services/DetailManufacturerService';
import UpdateManufacturerService from '@modules/manufacturer/services/UpdateManufacturerService';
import DeleteManufacturerService from '@modules/manufacturer/services/DeleteManufacturerService';
import ListManufacturerService from '@modules/manufacturer/services/ListManufacturerService';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createManufacturer = container.resolve(CreateManufacturerService);

    const manufacturer = await createManufacturer.execute({
      name,
    });

    return response.json(manufacturer);
  }

  public async detail(request: Request, response: Response): Promise<Response> {
    const manufacturer_id = request.params.id;

    const detailManufacturer = container.resolve(DetailManufacturerService);

    const manufacturer = await detailManufacturer.execute({
      manufacturer_id,
    });

    return response.json(manufacturer);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listManufacturer = container.resolve(ListManufacturerService);

    const categories = await listManufacturer.execute();

    return response.json(categories);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const manufacturer_id = request.params.id;

    const updateManufacturer = container.resolve(UpdateManufacturerService);

    const manufacturer = await updateManufacturer.execute({
      name,
      manufacturer_id,
    });

    return response.json(manufacturer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const manufacturer_id = request.params.id;

    const deleteManufacturer = container.resolve(DeleteManufacturerService);

    const manufacturer = await deleteManufacturer.execute({
      manufacturer_id,
    });

    return response.json(manufacturer);
  }
}
