import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IRequest {
  supplier_id: string;
}

@injectable()
export default class ListOrdersBySupplierService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ supplier_id }: IRequest): Promise<Order[]> {
    const cacheKey = `order-by-supplier:${supplier_id}`;

    // let products = await this.cacheProvider.recover<Product[]>(cacheKey);
    let orders;

    if (!orders) {
      orders = await this.ordersRepository.findBySupplier(supplier_id);

      await this.cacheProvider.save(cacheKey, orders);
    }

    return orders;
  }
}
