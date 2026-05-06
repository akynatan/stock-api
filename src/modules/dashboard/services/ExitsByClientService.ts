import { injectable } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';

import StockMovement from '@modules/stock_movements/infra/typeorm/entities/StockMovement';
import IExitsByClientDTO from '../dtos/IExitsByClientDTO';

@injectable()
export default class ExitsByClientService {
  private ormRepository: Repository<StockMovement>;

  constructor() {
    this.ormRepository = getRepository(StockMovement);
  }

  public async execute(): Promise<IExitsByClientDTO[]> {
    const result = await this.ormRepository
      .createQueryBuilder('sm')
      .select('sm.client_id', 'client_id')
      .addSelect('client.name', 'client_name')
      .addSelect('COUNT(*)', 'total_movements')
      .leftJoin('sm.client', 'client')
      .where("sm.type = 'saida'")
      .andWhere('sm.client_id IS NOT NULL')
      .groupBy('sm.client_id')
      .addGroupBy('client.name')
      .getRawMany();

    const exitsByClient: IExitsByClientDTO[] = result.map(row => ({
      client_id: row.client_id,
      client_name: row.client_name,
      total_movements: Number(row.total_movements),
    }));

    return exitsByClient;
  }
}
