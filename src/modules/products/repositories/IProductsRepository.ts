import ICreateProductDTO from '../dtos/ICreateProductDTO';
import Product from '../infra/typeorm/entities/Product';

export default interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  save(user: Product): Promise<Product>;
  findByID(id: string, relations: boolean): Promise<Product | undefined>;
  findByCode(code: string, relations: boolean): Promise<Product | undefined>;
  findAll(relations: boolean): Promise<Product[]>;
  delete(id: string): Promise<void>;
}
