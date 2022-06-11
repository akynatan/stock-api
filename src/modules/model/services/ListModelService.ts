import { injectable, inject } from 'tsyringe';

import Model from '../infra/typeorm/entities/Model';
import IModelsRepository from '../repositories/IModelRepository';

@injectable()
export default class ListModelService {
  constructor(
    @inject('ModelRepository')
    private modelRepository: IModelsRepository,
  ) {}

  public async execute(): Promise<Model[]> {
    const model = await this.modelRepository.findAll();

    return model;
  }
}
