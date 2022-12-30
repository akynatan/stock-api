import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IOrdersRepository from '../../orders/repositories/IOrdersRepository';
import IProductsOrderRepository from '../repositories/IProductsOrderRepository';
import ProductsOrder from '../infra/typeorm/entities/ProductsOrder';

interface IRequest {
  order_id: string;
}

@injectable()
export default class GetProductsByOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ProductsOrderRepository')
    private productsOrderRepository: IProductsOrderRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ order_id }: IRequest): Promise<ProductsOrder[]> {
    const order = await this.ordersRepository.findByID(order_id);

    if (!order) {
      throw new AppError('Order not found');
    }

    const products = await this.productsOrderRepository.getProducts(order_id);

    const products_returned = await Promise.all(
      products.map(async product => {
        const priceInLastOrder =
          await this.productsOrderRepository.findPriceInLastOrder(
            product.product_supplier.product_id,
          );

        let priceInLastOrderReturned = 0;
        if (priceInLastOrder) {
          priceInLastOrderReturned = priceInLastOrder.unit_price;
        }

        return Object.assign(product, {
          price_in_last_order: priceInLastOrderReturned,
        });
      }),
    );

    // await this.cacheProvider.invalidate('products-list');

    return products_returned;
  }
}
