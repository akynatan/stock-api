import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddMeasureUnitToProduct1646085281240
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'product',
      new TableColumn({
        name: 'measure_unit',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('product', 'measure_unit');
  }
}
