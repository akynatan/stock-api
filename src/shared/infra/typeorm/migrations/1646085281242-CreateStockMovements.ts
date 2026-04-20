import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateStockMovements1646085281242
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'stock_movements',
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
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'quantity',
            type: 'numeric',
          },
          {
            name: 'stock_after',
            type: 'numeric',
          },
          {
            name: 'reason',
            type: 'varchar',
          },
          {
            name: 'supplier_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'client_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          new TableForeignKey({
            name: 'ProductStockMovement',
            columnNames: ['product_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'product',
            onUpdate: 'CASCADE',
          }),
          new TableForeignKey({
            name: 'SupplierStockMovement',
            columnNames: ['supplier_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'supplier',
            onUpdate: 'CASCADE',
          }),
          new TableForeignKey({
            name: 'ClientStockMovement',
            columnNames: ['client_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'client',
            onUpdate: 'CASCADE',
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('stock_movements');
  }
}
