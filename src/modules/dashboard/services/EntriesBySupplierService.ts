import { injectable } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';

import StockMovement from '@modules/stock_movements/infra/typeorm/entities/StockMovement';
import IEntriesBySupplierDTO from '../dtos/IEntriesBySupplierDTO';

@injectable()
export default class EntriesBySupplierService {
  private ormRepository: Repository<StockMovement>;

  constructor() {
    this.ormRepository = getRepository(StockMovement);
  }

  public async execute(): Promise<IEntriesBySupplierDTO[]> {
    const result = await this.ormRepository
      .createQueryBuilder('sm')
      .select('sm.supplier_id', 'supplier_id')
      .addSelect('supplier.name_fantasy', 'supplier_name')
      .addSelect('COUNT(*)', 'total_movements')
      .leftJoin('sm.supplier', 'supplier')
      .where("sm.type = 'entrada'")
      .andWhere('sm.supplier_id IS NOT NULL')
      .groupBy('sm.supplier_id')
      .addGroupBy('supplier.name_fantasy')
      .getRawMany();

    const entriesBySupplier: IEntriesBySupplierDTO[] = result.map(row => ({
      supplier_id: row.supplier_id,
      supplier_name: row.supplier_name,
      total_movements: Number(row.total_movements),
    }));

    return entriesBySupplier;
  }
}
