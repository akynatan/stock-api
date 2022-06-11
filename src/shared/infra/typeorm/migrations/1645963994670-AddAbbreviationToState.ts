import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddAbbreviationToState1645963994670
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'state',
      new TableColumn({
        name: 'abbreviation',
        type: 'varchar',
        default: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('state', 'abbreviation');
  }
}
