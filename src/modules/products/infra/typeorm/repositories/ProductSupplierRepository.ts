import { getRepository, Repository } from 'typeorm';
import IProductSupplierRepository from '@modules/products/repositories/IProductSupplierRepository';

import ICreateProductSupplierDTO from '@modules/products/dtos/ICreateProductSupplierDTO';
import IGetByProductSupplierDTO from '@modules/products/dtos/IGetByProductSupplierDTO';

import ProductSupplier from '../entities/ProductSupplier';

export default class ProductSupplierRepository
  implements IProductSupplierRepository
{
  private ormRepository: Repository<ProductSupplier>;

  constructor() {
    this.ormRepository = getRepository(ProductSupplier);
  }

  public async create(
    productSupplierData: ICreateProductSupplierDTO,
  ): Promise<ProductSupplier> {
    const productSupplier = this.ormRepository.create(productSupplierData);
    await this.ormRepository.save(productSupplier);
    return productSupplier;
  }

  public async getSuppliers(product_id: string): Promise<ProductSupplier[]> {
    const suppliers = await this.ormRepository.find({
      where: { product_id },
      relations: ['suppliers'],
    });

    return suppliers;
  }

  public async getProducts(supplier_id: string): Promise<ProductSupplier[]> {
    const products = await this.ormRepository.find({
      where: { supplier_id },
    });

    return products;
  }

  public async save(
    product_supplier: ProductSupplier,
  ): Promise<ProductSupplier> {
    await this.ormRepository.save(product_supplier);

    return product_supplier;
  }

  public async findByID(id: string): Promise<ProductSupplier | undefined> {
    const product_supplier = await this.ormRepository.findOne(id, {
      relations: ['suppliers', 'products'],
    });
    return product_supplier;
  }

  public async delete(id: string): Promise<void> {
    await await this.ormRepository.delete({
      id,
    });
  }

  public async findBySupplierProduct({
    product_id,
    supplier_id,
  }: IGetByProductSupplierDTO): Promise<ProductSupplier | undefined> {
    const product_supplier = await this.ormRepository.findOne({
      where: {
        product_id,
        supplier_id,
      },
    });
    return product_supplier;
  }
}
