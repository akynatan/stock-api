import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  product_id: string;
}

@injectable()
export default class ToggleStatusProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ product_id }: IRequest): Promise<Product> {
    const product = await this.productsRepository.findByID(product_id, false);

    if (!product) {
      throw new AppError('Product not found.');
    }

    product.active = !product.active;
    await this.productsRepository.save(product);

    return product;
  }
}
