import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  product_id: string;
}

@injectable()
export default class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ product_id }: IRequest): Promise<Product> {
    const product = await this.productsRepository.findByID(product_id, false);

    if (!product) {
      throw new AppError('Product not found.');
    }

    await this.productsRepository.delete(product_id);

    return product;
  }
}
