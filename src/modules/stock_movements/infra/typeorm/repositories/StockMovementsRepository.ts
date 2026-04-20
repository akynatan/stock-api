import { getRepository, Repository } from 'typeorm';
import IStockMovementsRepository from '@modules/stock_movements/repositories/IStockMovementsRepository';
import ICreateStockMovementDTO from '@modules/stock_movements/dtos/ICreateStockMovementDTO';
import StockMovement from '../entities/StockMovement';

export default class StockMovementsRepository
  implements IStockMovementsRepository
{
  private ormRepository: Repository<StockMovement>;

  constructor() {
    this.ormRepository = getRepository(StockMovement);
  }

  public async create(data: ICreateStockMovementDTO): Promise<StockMovement> {
    const stockMovement = this.ormRepository.create(data);
    await this.ormRepository.save(stockMovement);
    return stockMovement;
  }

  public async findAll(): Promise<StockMovement[]> {
    const movements = await this.ormRepository.find({
      order: { created_at: 'DESC' },
      relations: ['product', 'supplier', 'client'],
    });
    return movements;
  }

  public async findByProductId(product_id: string): Promise<StockMovement[]> {
    const movements = await this.ormRepository.find({
      where: { product_id },
      order: { created_at: 'DESC' },
    });
    return movements;
  }
}
