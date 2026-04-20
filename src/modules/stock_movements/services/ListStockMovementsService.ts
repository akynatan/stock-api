import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import StockMovement from '../infra/typeorm/entities/StockMovement';
import IStockMovementsRepository from '../repositories/IStockMovementsRepository';

interface IRequest {
  product_id: string;
}

@injectable()
export default class ListStockMovementsService {
  constructor(
    @inject('StockMovementsRepository')
    private stockMovementsRepository: IStockMovementsRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ product_id }: IRequest): Promise<StockMovement[]> {
    const product = await this.productsRepository.findByID(product_id, false);

    if (!product) {
      throw new AppError('Product not found');
    }

    const movements = await this.stockMovementsRepository.findByProductId(
      product_id,
    );

    return movements;
  }
}
