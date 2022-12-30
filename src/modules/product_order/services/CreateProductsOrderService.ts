import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IProductSupplierRepository from '@modules/products/repositories/IProductSupplierRepository';

import AppError from '@shared/errors/AppError';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ProductsOrder from '../infra/typeorm/entities/ProductsOrder';
import IOrdersRepository from '../../orders/repositories/IOrdersRepository';
import IProductsOrderRepository from '../repositories/IProductsOrderRepository';

interface ICreateProductsOrderServiceDTO {
  product_id: string;
  order_id: string;
  unit_price?: number;
  qtd?: number;
  other_cost?: number;
  note: string;
}

interface IResponse extends ProductsOrder {
  price_in_last_order: number;
}

@injectable()
export default class CreateProductsOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ProductsOrderRepository')
    private productsOrderRepository: IProductsOrderRepository,

    @inject('ProductSupplierRepository')
    private productSupplierRepository: IProductSupplierRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('AmazonSellerProvider')
    private amazonSellerProvider: IAmazonSellerProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    product_id,
    order_id,
    unit_price,
    qtd,
    label,
    other_cost,
    note,
  }: ICreateProductsOrderServiceDTO): Promise<IResponse | undefined> {
    const order = await this.ordersRepository.findByID(order_id);

    if (!order) {
      throw new AppError('Order not found');
    }

    let product_supplier =
      await this.productSupplierRepository.findBySupplierProduct({
        product_id,
        supplier_id: order.supplier_id,
      });

    if (!product_supplier) {
      product_supplier = await this.productSupplierRepository.create({
        product_id,
        supplier_id: order.supplier_id,
      });
    }

    const product_order = await this.productsOrderRepository.create({
      product_supplier_id: product_supplier.id,
      unit_price,
      qtd,
      order_id,
      label,
      other_cost,
      note,
    });

    const product_order_response = await this.productsOrderRepository.findByID(
      product_order.id,
    );

    return product_order_response;
  }
}
