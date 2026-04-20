import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddActiveToClientAndProduct1650000000001
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'client',
      new TableColumn({
        name: 'active',
        type: 'boolean',
        default: true,
      }),
    );

    await queryRunner.addColumn(
      'product',
      new TableColumn({
        name: 'active',
        type: 'boolean',
        default: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('product', 'active');
    await queryRunner.dropColumn('client', 'active');
  }
}
