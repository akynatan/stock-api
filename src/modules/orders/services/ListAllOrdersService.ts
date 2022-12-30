import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

@injectable()
export default class ListAllOrdersService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<Order[]> {
    const cacheKey = `products-list`;

    // let products = await this.cacheProvider.recover<Product[]>(cacheKey);
    let orders;

    if (!orders) {
      orders = await this.ordersRepository.findAll();

      await this.cacheProvider.save(cacheKey, orders);
    }

    return orders;
  }
}
