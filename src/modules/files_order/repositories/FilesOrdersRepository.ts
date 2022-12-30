import { getRepository, Repository } from 'typeorm';
import IFilesOrdersRepository from '@modules/orders/repositories/IFilesOrdersRepository';

import AppError from '@shared/errors/AppError';
import ICreateFilesOrderDTO from '@modules/files_order/dtos/ICreateFilesOrderDTO';
import FilesOrders from '../entities/FilesOrders';

export default class FilesOrdersRepository implements IFilesOrdersRepository {
  private ormRepository: Repository<FilesOrders>;

  constructor() {
    this.ormRepository = getRepository(FilesOrders);
  }

  public async save(order: FilesOrders): Promise<FilesOrders> {
    await this.ormRepository.save(order);
    return order;
  }

  public async create(orderData: ICreateFilesOrderDTO): Promise<FilesOrders> {
    const order = this.ormRepository.create(orderData);
    await this.ormRepository.save(order);
    return order;
  }

  public async findAll(): Promise<FilesOrders[]> {
    const orders = await this.ormRepository.find({
      relations: ['order'],
    });
    return orders;
  }

  public async findByID(id: string): Promise<FilesOrders | undefined> {
    const order = await this.ormRepository.findOne(id, {
      relations: ['order'],
    });
    return order;
  }

  public async findByOrder(order_id: string): Promise<FilesOrders[]> {
    const files_orders = await this.ormRepository.find({
      where: {
        order_id,
      },
    });
    return files_orders;
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
