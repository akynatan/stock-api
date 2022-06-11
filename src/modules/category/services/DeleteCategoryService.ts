import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Category from '../infra/typeorm/entities/Category';
import ICategorysRepository from '../repositories/ICategoryRepository';

interface IRequest {
  category_id: string;
}

@injectable()
export default class DeleteCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategorysRepository,
  ) {}

  public async execute({ category_id }: IRequest): Promise<Category> {
    const category = await this.categoryRepository.findByID(category_id);

    if (!category) {
      throw new AppError('Category not found.');
    }

    await this.categoryRepository.delete(category_id);

    return category;
  }
}
