import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddActiveToSupplier1646081085183
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'supplier',
      new TableColumn({
        name: 'active',
        type: 'boolean',
        default: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('supplier', 'active');
  }
}
