import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Supplier from '../infra/typeorm/entities/Supplier';
import ISuppliersRepository from '../repositories/ISuppliersRepository';

@injectable()
export default class ListAllSuppliersService {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<Supplier[]> {
    const suppliers = await this.suppliersRepository.findAll(true);

    // await this.cacheProvider.invalidate(`suppliers`);

    return suppliers;
  }
}
