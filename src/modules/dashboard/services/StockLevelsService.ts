import { injectable } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';

import StockMovement from '@modules/stock_movements/infra/typeorm/entities/StockMovement';
import IStockLevelDTO from '../dtos/IStockLevelDTO';

interface IRequest {
  start_date: string;
  end_date: string;
}

@injectable()
export default class StockLevelsService {
  private ormRepository: Repository<StockMovement>;

  constructor() {
    this.ormRepository = getRepository(StockMovement);
  }

  public async execute({ start_date, end_date }: IRequest): Promise<IStockLevelDTO[]> {
    const movements = await this.ormRepository
      .createQueryBuilder('sm')
      .innerJoin(
        subQuery =>
          subQuery
            .select('sm2.product_id', 'product_id')
            .addSelect('MAX(sm2.created_at)', 'max_date')
            .from(StockMovement, 'sm2')
            .where('sm2.created_at BETWEEN :start_date AND :end_date', {
              start_date,
              end_date,
            })
            .groupBy('sm2.product_id'),
        'latest',
        'sm.product_id = latest.product_id AND sm.created_at = latest.max_date',
      )
      .leftJoinAndSelect('sm.product', 'product')
      .getMany();

    const result: IStockLevelDTO[] = movements.map(movement => ({
      product_id: movement.product_id,
      product_name: movement.product.name,
      last_movement_date: movement.created_at.toISOString(),
      type: movement.type as 'entrada' | 'saida',
      stock_after: Number(movement.stock_after),
    }));

    return result;
  }
}
