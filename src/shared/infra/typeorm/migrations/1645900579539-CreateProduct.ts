import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateProduct1645900579539 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'product',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'code',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'brand_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'model_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'category_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'manufacturer_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'image',
            type: 'varchar',
            isNullable: true,
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
            name: 'BrandProduct',
            columnNames: ['brand_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'brand',
            onUpdate: 'CASCADE',
          }),
          new TableForeignKey({
            name: 'ModelProduct',
            columnNames: ['model_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'model',
            onUpdate: 'CASCADE',
          }),
          new TableForeignKey({
            name: 'CategoryProduct',
            columnNames: ['category_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'category',
            onUpdate: 'CASCADE',
          }),
          new TableForeignKey({
            name: 'ManufacturerProduct',
            columnNames: ['manufacturer_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'manufacturer',
            onUpdate: 'CASCADE',
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('product');
  }
}
