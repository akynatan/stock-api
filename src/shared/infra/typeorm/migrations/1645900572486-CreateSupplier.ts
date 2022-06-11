import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateSupplier1645900572486 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'supplier',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name_social_reason',
            type: 'varchar',
          },
          {
            name: 'name_fantasy',
            type: 'varchar',
          },
          {
            name: 'cnpj',
            type: 'varchar',
          },
          {
            name: 'tel',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'tel2',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'domain',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'city_id',
            type: 'uuid',
          },
          {
            name: 'neighborhood',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'street',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'cep',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'number',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'complement',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'representative_name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'mail',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'mail2',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'logo',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'note',
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
            name: 'CitySupplier',
            columnNames: ['city_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'city',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('supplier');
  }
}
