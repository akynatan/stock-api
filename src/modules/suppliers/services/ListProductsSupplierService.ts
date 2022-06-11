import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IProductSupplierRepository from '@modules/products/repositories/IProductSupplierRepository';
import ProductSupplier from '@modules/products/infra/typeorm/entities/ProductSupplier';

interface IRequest {
  supplier_id: string;
}

@injectable()
export default class ListProductsSupplierService {
  constructor(
    @inject('ProductSupplierRepository')
    private productSupplierRepository: IProductSupplierRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ supplier_id }: IRequest): Promise<ProductSupplier[]> {
    const suppliers = await this.productSupplierRepository.getProducts(
      supplier_id,
    );

    return suppliers;
  }
}
