import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Model from '../infra/typeorm/entities/Model';
import IModelsRepository from '../repositories/IModelRepository';

interface IRequest {
  model_id: string;
}

@injectable()
export default class DetailModelService {
  constructor(
    @inject('ModelRepository')
    private modelRepository: IModelsRepository,
  ) {}

  public async execute({ model_id }: IRequest): Promise<Model> {
    const model = await this.modelRepository.findByID(model_id);

    if (!model) {
      throw new AppError('Model not found.');
    }

    return model;
  }
}
