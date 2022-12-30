import ICreateOrderDTO from '../dtos/ICreateOrderDTO';
import Order from '../infra/typeorm/entities/Order';

export default interface IOrdersRepository {
  create(data: ICreateOrderDTO): Promise<Order>;
  save(order: Order): Promise<Order>;
  findByID(id: string): Promise<Order | undefined>;
  findAll(): Promise<Order[]>;
  delete(id: string): Promise<void>;
  findBySupplier(supplier_id: string): Promise<Order[]>;
}
