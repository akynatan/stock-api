import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Category from '../infra/typeorm/entities/Category';
import ICategoryRepository from '../repositories/ICategoryRepository';

interface IRequest {
  name: string;
}

@injectable()
export default class CreateCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name }: IRequest): Promise<Category> {
    const checkCategoryExists = await this.categoryRepository.findByName(name);

    if (checkCategoryExists) {
      throw new AppError('Name already used.');
    }

    const category = await this.categoryRepository.create({
      name,
    });

    await this.cacheProvider.invalidatePrefix('category-list');

    return category;
  }
}
