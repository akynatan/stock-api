import { getRepository, Repository } from 'typeorm';
import ICategorysRepository from '@modules/category/repositories/ICategoryRepository';
import ICreateCategoryDTO from '@modules/category/dtos/ICreateCategoryDTO';

import AppError from '@shared/errors/AppError';
import Category from '../entities/Category';

export default class CategorysRepository implements ICategorysRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async save(category: Category): Promise<Category> {
    await this.ormRepository.save(category);
    return category;
  }

  public async create(categoryData: ICreateCategoryDTO): Promise<Category> {
    const category = this.ormRepository.create(categoryData);
    await this.ormRepository.save(category);
    return category;
  }

  public async findAll(): Promise<Category[]> {
    const category = await this.ormRepository.find();
    return category;
  }

  public async findByName(name: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return category;
  }

  public async findByID(id: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne(id, {});
    return category;
  }

  public async delete(id: string): Promise<void> {
    try {
      await await this.ormRepository.delete({
        id,
      });
    } catch (err) {
      console.log(err);
      throw new AppError('Erro to delete category');
    }
  }
}
