import { getRepository, Repository } from 'typeorm';
import IProductsOrderRepository from '@modules/orders/repositories/IProductsOrderRepository';

import ICreateProductsOrderDTO from '@modules/product_order/dtos/ICreateProductsOrderDTO';
import AppError from '@shared/errors/AppError';
import ProductsOrder from '../entities/ProductsOrder';

export default class ProductsOrderRepository
  implements IProductsOrderRepository {
  private ormRepository: Repository<ProductsOrder>;

  constructor() {
    this.ormRepository = getRepository(ProductsOrder);
  }

  public async save(product_order: ProductsOrder): Promise<ProductsOrder> {
    await this.ormRepository.save(product_order);
    return product_order;
  }

  public async create(
    productOrderData: ICreateProductsOrderDTO,
  ): Promise<ProductsOrder> {
    const product_order = this.ormRepository.create(productOrderData);
    await this.ormRepository.save(product_order);
    return product_order;
  }

  public async findAll(): Promise<ProductsOrder[]> {
    const products_order = await this.ormRepository.find({
      relations: ['product_supplier', 'product_supplier.products'],
    });
    return products_order;
  }

  public async findByID(id: string): Promise<ProductsOrder | undefined> {
    const products_order = await this.ormRepository.findOne(id, {
      relations: ['product_supplier', 'product_supplier.products'],
    });
    return products_order;
  }

  public async getProducts(order_id: string): Promise<ProductsOrder[]> {
    const products = await this.ormRepository.find({
      where: { order_id },
      relations: ['product_supplier', 'product_supplier.products'],
    });

    return products;
  }

  public async findByProduct(product_id: string): Promise<ProductsOrder[]> {
    const all_products = await this.ormRepository.find({
      relations: [
        'product_supplier',
        'product_supplier.products',
        'order',
        'product_supplier.suppliers',
      ],
    });

    const products = all_products.filter(
      p => p.product_supplier.product_id === product_id,
    );

    return products;
  }

  public async delete(id: string): Promise<void> {
    try {
      await await this.ormRepository.delete({
        id,
      });
    } catch (err) {
      throw new AppError('Erro');
    }
  }

  public async findPriceInLastOrder(
    product_id: string,
  ): Promise<ProductsOrder | undefined> {
    const last_price = await this.ormRepository
      .createQueryBuilder('product_order')
      .leftJoinAndSelect(
        'product_supplier',
        'ps',
        'ps.id = product_order.product_supplier_id',
      )
      .where('ps.product_id = :product_id', { product_id })
      .orderBy('product_order.created_at', 'DESC')
      .getOne();

    return last_price;
  }
}
