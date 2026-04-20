import ICreateStockMovementDTO from '../dtos/ICreateStockMovementDTO';
import StockMovement from '../infra/typeorm/entities/StockMovement';

export default interface IStockMovementsRepository {
  create(data: ICreateStockMovementDTO): Promise<StockMovement>;
  findAll(): Promise<StockMovement[]>;
  findByProductId(product_id: string): Promise<StockMovement[]>;
}
