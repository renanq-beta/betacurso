import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableCourse1613995400351 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.createTable(
      new Table({
        name: 'courses',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            default: 'uuid_generate_v4()',
            generationStrategy: 'uuid',
          },
          {
              name: "name",
              type: "varchar",
              isNullable: false,
          },
          {
              name: "description",
              type: "varchar",
              isNullable: false,
          },
          {
              name: "views",
              type: "int",
              default: "0",
          },
          {
              name: "video",
              type: "varchar",
              isNullable: false,
          },
          {
              name: "duration",
              type: "varchar",
          },
          {
              name: "created_at",
              type: "timestamp",
              default: "now()",
              isNullable: false,
          }
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`DROP EXTENSION "uuid-ossp"`);

      await queryRunner.dropTable("courses");
  }
}
