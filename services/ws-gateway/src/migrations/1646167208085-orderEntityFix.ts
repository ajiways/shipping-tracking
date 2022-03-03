import {MigrationInterface, QueryRunner} from "typeorm";

export class orderEntityFix1646167208085 implements MigrationInterface {
    name = 'orderEntityFix1646167208085'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "orders" DROP COLUMN "start_lat"
        `);
        await queryRunner.query(`
            ALTER TABLE "orders"
            ADD "start_lat" double precision NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "orders" DROP COLUMN "start_lng"
        `);
        await queryRunner.query(`
            ALTER TABLE "orders"
            ADD "start_lng" double precision NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "orders" DROP COLUMN "end_lat"
        `);
        await queryRunner.query(`
            ALTER TABLE "orders"
            ADD "end_lat" double precision NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "orders" DROP COLUMN "end_lng"
        `);
        await queryRunner.query(`
            ALTER TABLE "orders"
            ADD "end_lng" double precision NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "orders" DROP COLUMN "end_lng"
        `);
        await queryRunner.query(`
            ALTER TABLE "orders"
            ADD "end_lng" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "orders" DROP COLUMN "end_lat"
        `);
        await queryRunner.query(`
            ALTER TABLE "orders"
            ADD "end_lat" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "orders" DROP COLUMN "start_lng"
        `);
        await queryRunner.query(`
            ALTER TABLE "orders"
            ADD "start_lng" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "orders" DROP COLUMN "start_lat"
        `);
        await queryRunner.query(`
            ALTER TABLE "orders"
            ADD "start_lat" integer NOT NULL
        `);
    }

}
