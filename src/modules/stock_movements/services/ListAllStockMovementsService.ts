import { injectable, inject } from 'tsyringe';

import StockMovement from '../infra/typeorm/entities/StockMovement';
import IStockMovementsRepository from '../repositories/IStockMovementsRepository';

@injectable()
export default class ListAllStockMovementsService {
  constructor(
    @inject('StockMovementsRepository')
    private stockMovementsRepository: IStockMovementsRepository,
  ) {}

  public async execute(): Promise<StockMovement[]> {
    const movements = await this.stockMovementsRepository.findAll();
    return movements;
  }
}
