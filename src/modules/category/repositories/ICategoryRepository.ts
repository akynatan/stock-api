import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';
import Category from '../infra/typeorm/entities/Category';

export default interface ICategoryRepository {
  create(data: ICreateCategoryDTO): Promise<Category>;
  save(user: Category): Promise<Category>;
  findByID(id: string): Promise<Category | undefined>;
  findByName(name: string): Promise<Category | undefined>;
  findAll(): Promise<Category[]>;
  delete(id: string): Promise<void>;
}
