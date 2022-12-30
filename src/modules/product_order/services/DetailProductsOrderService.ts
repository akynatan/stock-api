import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ProductsOrder from '../infra/typeorm/entities/ProductsOrder';
import IProductsOrderRepository from '../repositories/IProductsOrderRepository';

interface IRequest {
  product_order_id: string;
}

@injectable()
export default class DetailProductsOrderService {
  constructor(
    @inject('ProductsOrderRepository')
    private productsOrderRepository: IProductsOrderRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ product_order_id }: IRequest): Promise<ProductsOrder> {
    const products_order = await this.productsOrderRepository.findByID(
      product_order_id,
    );

    if (!products_order) {
      throw new AppError('Product Order not found.');
    }

    // await this.cacheProvider.invalidate('products-list');

    return products_order;
  }
}
