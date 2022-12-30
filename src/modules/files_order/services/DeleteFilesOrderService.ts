/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IFilesOrdersRepository from '../infra/typeorm/repositories/IFilesOrdersRepository';

interface IRequest {
  id: string;
}

@injectable()
export default class DeleteFilesOrderService {
  constructor(
    @inject('FilesOrdersRepository')
    private filesOrdersRepository: IFilesOrdersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const file_order = await this.filesOrdersRepository.findByID(id);

    if (!file_order) {
      throw new AppError('File not found');
    }

    await this.storageProvider.deleteFile(file_order.name_file);

    await this.filesOrdersRepository.delete(id);
  }
}
