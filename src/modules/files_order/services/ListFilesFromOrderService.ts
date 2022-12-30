/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IFilesOrdersRepository from '../infra/typeorm/repositories/IFilesOrdersRepository';
import FilesOrders from '../infra/typeorm/entities/FilesOrders';
import IOrdersRepository from '../../orders/repositories/IOrdersRepository';

interface IRequest {
  order_id: string;
}

@injectable()
export default class ListFilesFromOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('FilesOrdersRepository')
    private filesOrdersRepository: IFilesOrdersRepository,
  ) {}

  public async execute({ order_id }: IRequest): Promise<FilesOrders[]> {
    const order = await this.ordersRepository.findByID(order_id);

    if (!order) {
      throw new AppError('Order not found');
    }

    const files_order = await this.filesOrdersRepository.findByOrder(order_id);

    return files_order;
  }
}
