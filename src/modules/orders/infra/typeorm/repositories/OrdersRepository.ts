import { getRepository, Repository } from 'typeorm';
import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';

import AppError from '@shared/errors/AppError';
import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';
import Order from '../entities/Order';

export default class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async save(order: Order): Promise<Order> {
    await this.ormRepository.save(order);
    return order;
  }

  public async create(orderData: ICreateOrderDTO): Promise<Order> {
    const order = this.ormRepository.create(orderData);
    await this.ormRepository.save(order);
    return order;
  }

  public async findAll(): Promise<Order[]> {
    const orders = await this.ormRepository.find({
      relations: [
        'supplier',
        'shipments',
        'products_order',
        'products_order.product_supplier',
        'products_order.product_supplier.products',
      ],
      order: {
        date: 'DESC',
      },
    });
    return orders;
  }

  public async findByID(id: string): Promise<Order | undefined> {
    const order = await this.ormRepository.findOne({
      relations: ['supplier'],
      where: {
        id,
      },
    });
    return order;
  }

  public async findBySupplier(supplier_id: string): Promise<Order[]> {
    const orders = await this.ormRepository.find({
      where: {
        supplier_id,
      },
    });

    return orders;
  }

  public async delete(id: string): Promise<void> {
    try {
      await await this.ormRepository.delete({
        id,
      });
    } catch (err) {
      throw new AppError('Erro');
    }
  }
}
