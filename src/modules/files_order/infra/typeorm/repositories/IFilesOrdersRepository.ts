import ICreateFilesOrderDTO from '../../../dtos/ICreateFilesOrderDTO';
import FilesOrders from '../entities/FilesOrders';

export default interface IFilesOrdersRepository {
  create(data: ICreateFilesOrderDTO): Promise<FilesOrders>;
  save(order: FilesOrders): Promise<FilesOrders>;
  findByID(id: string): Promise<FilesOrders | undefined>;
  findByOrder(order_id: string): Promise<FilesOrders[]>;
  delete(id: string): Promise<void>;
}
