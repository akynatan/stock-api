import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateProcutSupplier1645900587426
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'product_supplier',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'product_id',
            type: 'uuid',
          },
          {
            name: 'supplier_id',
            type: 'uuid',
          },
          {
            name: 'note',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'restriction_to_buy',
            type: 'boolean',
            isNullable: true,
            default: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          new TableForeignKey({
            name: 'ProductProductSupplier',
            columnNames: ['product_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'product',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
          }),
          new TableForeignKey({
            name: 'SupplierProductSupplier',
            columnNames: ['supplier_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'supplier',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('product_supplier');
  }
}
