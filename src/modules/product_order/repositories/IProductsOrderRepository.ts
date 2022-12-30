import ICreateProductsOrderDTO from '../dtos/ICreateProductsOrderDTO';
import ProductsOrder from '../infra/typeorm/entities/ProductsOrder';

export default interface IProductsOrderRepository {
  create(data: ICreateProductsOrderDTO): Promise<ProductsOrder>;
  save(order: ProductsOrder): Promise<ProductsOrder>;
  findByID(id: string): Promise<ProductsOrder | undefined>;
  findAll(): Promise<ProductsOrder[]>;
  findByProduct(product_id: string): Promise<ProductsOrder[]>;
  getProducts(order_id: string): Promise<ProductsOrder[]>;
  delete(id: string): Promise<void>;
}
