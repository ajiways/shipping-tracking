import {MigrationInterface, QueryRunner} from "typeorm";

export class orderEntity1646140468604 implements MigrationInterface {
    name = 'orderEntity1646140468604'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "orders" (
                "id" integer NOT NULL,
                "order_status" character varying NOT NULL,
                "start_lat" integer NOT NULL,
                "start_lng" integer NOT NULL,
                "end_lat" integer NOT NULL,
                "end_lng" integer NOT NULL,
                CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "orders"
        `);
    }

}
