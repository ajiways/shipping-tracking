import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrderEntityFix1646167085372 implements MigrationInterface {
  name = 'OrderEntityFix1646167085372';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "order" DROP COLUMN "start_lat"
        `);
    await queryRunner.query(`
            ALTER TABLE "order"
            ADD "start_lat" double precision NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "order" DROP COLUMN "start_lng"
        `);
    await queryRunner.query(`
            ALTER TABLE "order"
            ADD "start_lng" double precision NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "order" DROP COLUMN "end_lat"
        `);
    await queryRunner.query(`
            ALTER TABLE "order"
            ADD "end_lat" double precision NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "order" DROP COLUMN "end_lng"
        `);
    await queryRunner.query(`
            ALTER TABLE "order"
            ADD "end_lng" double precision NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "order" DROP COLUMN "end_lng"
        `);
    await queryRunner.query(`
            ALTER TABLE "order"
            ADD "end_lng" integer NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "order" DROP COLUMN "end_lat"
        `);
    await queryRunner.query(`
            ALTER TABLE "order"
            ADD "end_lat" integer NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "order" DROP COLUMN "start_lng"
        `);
    await queryRunner.query(`
            ALTER TABLE "order"
            ADD "start_lng" integer NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "order" DROP COLUMN "start_lat"
        `);
    await queryRunner.query(`
            ALTER TABLE "order"
            ADD "start_lat" integer NOT NULL
        `);
  }
}
