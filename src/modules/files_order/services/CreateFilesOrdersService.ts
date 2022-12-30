/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IFilesOrdersRepository from '../infra/typeorm/repositories/IFilesOrdersRepository';
import FilesOrders from '../infra/typeorm/entities/FilesOrders';
import IOrdersRepository from '../../orders/repositories/IOrdersRepository';

interface IRequest {
  order_id: string;
  fileName: string;
  originalname: string;
}

@injectable()
export default class CreateFilesOrdersService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('FilesOrdersRepository')
    private filesOrdersRepository: IFilesOrdersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    order_id,
    fileName,
    originalname,
  }: IRequest): Promise<FilesOrders> {
    const order = await this.ordersRepository.findByID(order_id);

    if (!order) {
      throw new AppError('Order not found');
    }

    const name_file = await this.storageProvider.saveFile(fileName);

    const file_order = await this.filesOrdersRepository.create({
      order_id,
      name_file,
      name_file_original: originalname,
    });

    return file_order;
  }
}
