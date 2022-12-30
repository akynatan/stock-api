/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProductsOrderRepository from '../../product_order/repositories/IProductsOrderRepository';

interface IRequest {
  id: string;
}

@injectable()
export default class DeleteProductsOrderService {
  constructor(
    @inject('ProductsOrderRepository')
    private productsOrderRepository: IProductsOrderRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const product = await this.productsOrderRepository.findByID(id);

    if (!product) {
      throw new AppError('Shipment not found');
    }

    await this.productsOrderRepository.delete(id);
  }
}
