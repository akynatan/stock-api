import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import Supplier from '../infra/typeorm/entities/Supplier';
import ISuppliersRepository from '../repositories/ISuppliersRepository';

interface IRequest {
  supplier_id: string;
  imageFileName: string;
}

@injectable()
export default class UpdateSupplierLogoService {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    supplier_id,
    imageFileName,
  }: IRequest): Promise<Supplier> {
    const supplier = await this.suppliersRepository.findByID(supplier_id, true);

    if (!supplier) {
      throw new AppError('Supplier not found.');
    }

    if (supplier.logo) {
      await this.storageProvider.deleteFile(supplier.logo);
    }

    const filename = await this.storageProvider.saveFile(imageFileName);

    supplier.logo = filename;

    await this.suppliersRepository.save(supplier);

    return supplier;
  }
}
