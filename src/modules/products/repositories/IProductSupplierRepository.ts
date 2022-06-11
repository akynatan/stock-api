import ICreateProductSupplierDTO from '../dtos/ICreateProductSupplierDTO';
import IGetByProductSupplierDTO from '../dtos/IGetByProductSupplierDTO';
import ProductSupplier from '../infra/typeorm/entities/ProductSupplier';

export default interface IProductSupplierRepository {
  create(data: ICreateProductSupplierDTO): Promise<ProductSupplier>;
  getSuppliers(product_id: string): Promise<ProductSupplier[]>;
  getProducts(supplier_id: string): Promise<ProductSupplier[]>;
  save(product_supplier: ProductSupplier): Promise<ProductSupplier>;
  findByID(id: string): Promise<ProductSupplier | undefined>;
  delete(id: string): Promise<void>;
  findBySupplierProduct({
    product_id,
    supplier_id,
  }: IGetByProductSupplierDTO): Promise<ProductSupplier | undefined>;
}
