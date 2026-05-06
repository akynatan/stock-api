import { injectable } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';

import StockMovement from '@modules/stock_movements/infra/typeorm/entities/StockMovement';
import IMovementsSummaryDTO from '../dtos/IMovementsSummaryDTO';

interface IRequest {
  start_date: string;
  end_date: string;
}

@injectable()
export default class MovementsSummaryService {
  private ormRepository: Repository<StockMovement>;

  constructor() {
    this.ormRepository = getRepository(StockMovement);
  }

  public async execute({
    start_date,
    end_date,
  }: IRequest): Promise<IMovementsSummaryDTO[]> {
    const rawResults = await this.ormRepository
      .createQueryBuilder('sm')
      .select('sm.product_id', 'product_id')
      .addSelect('product.name', 'product_name')
      .addSelect(
        "SUM(CASE WHEN sm.type = 'entrada' THEN sm.quantity ELSE 0 END)",
        'total_entries',
      )
      .addSelect(
        "SUM(CASE WHEN sm.type = 'saida' THEN sm.quantity ELSE 0 END)",
        'total_exits',
      )
      .leftJoin('sm.product', 'product')
      .where('sm.created_at BETWEEN :start_date AND :end_date', {
        start_date,
        end_date,
      })
      .groupBy('sm.product_id')
      .addGroupBy('product.name')
      .getRawMany();

    const result: IMovementsSummaryDTO[] = rawResults.map(raw => ({
      product_id: raw.product_id,
      product_name: raw.product_name,
      total_entries: Number(raw.total_entries),
      total_exits: Number(raw.total_exits),
    }));

    return result;
  }
}
