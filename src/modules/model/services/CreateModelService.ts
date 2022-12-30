import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Model from '../infra/typeorm/entities/Model';
import IModelRepository from '../repositories/IModelRepository';

interface IRequest {
  name: string;
}

@injectable()
export default class CreateCategoryService {
  constructor(
    @inject('ModelRepository')
    private modelRepository: IModelRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name }: IRequest): Promise<Model> {
    const checkModelExists = await this.modelRepository.findByName(name);

    if (checkModelExists) {
      throw new AppError('Name already used.');
    }

    const model = await this.modelRepository.create({
      name,
    });

    await this.cacheProvider.invalidatePrefix('model-list');

    return model;
  }
}
