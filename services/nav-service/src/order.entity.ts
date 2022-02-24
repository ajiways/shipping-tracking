import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum OrderStatus {
  waitingOrder = 'Ожидание подтверждения оплаты',
  packingOrder = 'Заказ собирается',
  handedToCourier = 'Заказ передан курьеру',
  deliveredOrder = 'Заказ доставлен',
}

@Entity('orders')
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: string;

  @Column({
    enum: OrderStatus,
  })
  orderStatus: OrderStatus;

  @Column()
  startLat: number;

  @Column()
  startLng: number;

  @Column()
  endLat: number;

  @Column()
  endLng: number;
}
