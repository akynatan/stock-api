import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddCodeToClientAndSupplier1650000000000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'client',
      new TableColumn({
        name: 'code',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'supplier',
      new TableColumn({
        name: 'code',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('supplier', 'code');
    await queryRunner.dropColumn('client', 'code');
  }
}
