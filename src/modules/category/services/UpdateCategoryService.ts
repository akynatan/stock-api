import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Category from '../infra/typeorm/entities/Category';
import ICategorysRepository from '../repositories/ICategoryRepository';

interface IRequest {
  category_id: string;
  name: string;
}

@injectable()
export default class UpdateCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategorysRepository,
  ) {}

  public async execute({ category_id, name }: IRequest): Promise<Category> {
    const category = await this.categoryRepository.findByID(category_id);

    if (!category) {
      throw new AppError('Category not found.');
    }

    const checkCategoryExists = await this.categoryRepository.findByName(name);

    if (checkCategoryExists) {
      throw new AppError('Name already used.');
    }

    category.name = name;

    await this.categoryRepository.save(category);

    return category;
  }
}
