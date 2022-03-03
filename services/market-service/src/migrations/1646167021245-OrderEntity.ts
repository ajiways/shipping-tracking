import {MigrationInterface, QueryRunner} from "typeorm";

export class OrderEntity1646167021245 implements MigrationInterface {
    name = 'OrderEntity1646167021245'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."order_order_status_enum" AS ENUM(
                'Ожидание подтверждения оплаты',
                'Заказ собирается',
                'Заказ передан курьеру',
                'Заказ доставлен'
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "order" (
                "id" SERIAL NOT NULL,
                "order_status" "public"."order_order_status_enum" NOT NULL DEFAULT 'Ожидание подтверждения оплаты',
                "start_lat" integer NOT NULL,
                "start_lng" integer NOT NULL,
                "end_lat" integer NOT NULL,
                "end_lng" integer NOT NULL,
                CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "order"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."order_order_status_enum"
        `);
    }

}
