import { injectable, inject } from 'tsyringe';

import Category from '../infra/typeorm/entities/Category';
import ICategorysRepository from '../repositories/ICategoryRepository';

@injectable()
export default class ListCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategorysRepository,
  ) {}

  public async execute(): Promise<Category[]> {
    const category = await this.categoryRepository.findAll();

    return category;
  }
}
