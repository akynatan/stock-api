import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Model from '../infra/typeorm/entities/Model';
import IModelsRepository from '../repositories/IModelRepository';

interface IRequest {
  model_id: string;
  name: string;
}

@injectable()
export default class UpdateModelService {
  constructor(
    @inject('ModelRepository')
    private modelRepository: IModelsRepository,
  ) {}

  public async execute({ model_id, name }: IRequest): Promise<Model> {
    const model = await this.modelRepository.findByID(model_id);

    if (!model) {
      throw new AppError('Model not found.');
    }

    const checkModelExists = await this.modelRepository.findByName(name);

    if (checkModelExists) {
      throw new AppError('Name already used.');
    }

    model.name = name;

    await this.modelRepository.save(model);

    return model;
  }
}
