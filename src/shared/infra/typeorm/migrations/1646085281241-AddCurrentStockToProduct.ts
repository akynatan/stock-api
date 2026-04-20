import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddCurrentStockToProduct1646085281241
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'product',
      new TableColumn({
        name: 'current_stock',
        type: 'numeric',
        isNullable: false,
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('product', 'current_stock');
  }
}
