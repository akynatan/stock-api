import { getRepository, Repository } from 'typeorm';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';

import AppError from '@shared/errors/AppError';
import Product from '../entities/Product';

export default class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async save(product: Product): Promise<Product> {
    await this.ormRepository.save(product);
    return product;
  }

  public async create(productData: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create(productData);
    await this.ormRepository.save(product);
    return product;
  }

  public async findAll(relations = false): Promise<Product[]> {
    const products = await this.ormRepository.find({
      relations: relations
        ? ['brand', 'model', 'category', 'manufacturer']
        : [],
    });
    return products;
  }

  public async findByCode(
    code: string,
    relations = false,
  ): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: {
        code,
      },
      relations: relations
        ? ['brand', 'model', 'category', 'manufacturer']
        : [],
    });
    return product;
  }

  public async findByID(
    id: string,
    relations = false,
  ): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne(id, {
      relations: relations
        ? ['brand', 'model', 'category', 'manufacturer']
        : [],
    });
    return product;
  }

  public async delete(id: string): Promise<void> {
    try {
      await await this.ormRepository.delete({
        id,
      });
    } catch (err) {
      console.log(err);
      throw new AppError('Erro');
    }
  }
}
