import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import AppError from '@shared/errors/AppError';
import ISuppliersRepository from '@modules/suppliers/repositories/ISuppliersRepository';
import Order from '../infra/typeorm/entities/Order';
import ICreateOrderDTO from '../dtos/ICreateOrderDTO';
import IOrdersRepository from '../repositories/IOrdersRepository';

@injectable()
export default class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository,
  ) {}

  public async execute({
    date,
    supplier_id,
    form_payment,
    its_paid,
    total_charged,
    shipment_cost,
    other_cost,
    invoice,
    note,
    status,
  }: ICreateOrderDTO): Promise<Order> {
    const supplier = await this.suppliersRepository.findByID(supplier_id);

    if (!supplier) {
      throw new AppError('Supplier not found');
    }

    const order = await this.ordersRepository.create({
      date,
      supplier_id,
      form_payment,
      shipment_cost,
      other_cost,
      its_paid,
      total_charged,
      invoice,
      note,
      status,
    });

    // await this.cacheProvider.invalidate('products-list');

    return order;
  }
}
