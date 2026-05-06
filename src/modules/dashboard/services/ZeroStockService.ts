import { injectable } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';

import Product from '@modules/products/infra/typeorm/entities/Product';
import IZeroStockDTO from '../dtos/IZeroStockDTO';

@injectable()
export default class ZeroStockService {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async execute(): Promise<IZeroStockDTO[]> {
    const products = await this.ormRepository.find({
      where: { current_stock: 0 },
      relations: ['category', 'brand'],
    });

    const result: IZeroStockDTO[] = products.map(product => ({
      product_id: product.id,
      product_name: product.name,
      category_name: product.category ? product.category.name : '',
      brand_name: product.brand ? product.brand.name : '',
    }));

    return result;
  }
}
