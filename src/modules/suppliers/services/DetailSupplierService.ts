import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Supplier from '../infra/typeorm/entities/Supplier';
import ISuppliersRepository from '../repositories/ISuppliersRepository';

interface IRequest {
  supplier_id: string;
}

@injectable()
export default class DetailSupplierService {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ supplier_id }: IRequest): Promise<Supplier> {
    const supplier = await this.suppliersRepository.findByID(supplier_id, true);

    if (!supplier) {
      throw new AppError('Supplier not found.');
    }

    // await this.cacheProvider.invalidate('products-list');

    return supplier;
  }
}
