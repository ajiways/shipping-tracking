import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';

export enum OrderStatus {
  waitingOrder = 'Ожидание подтверждения оплаты',
  packingOrder = 'Заказ собирается',
  handedToCourier = 'Заказ передан курьеру',
  deliveredOrder = 'Заказ доставлен',
}

@Entity('order')
export class OrderEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  orderId!: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.waitingOrder,
  })
  orderStatus!: OrderStatus;

  @Column()
  startLat: number;

  @Column()
  startLng: number;

  @Column()
  endLat: number;

  @Column()
  endLng: number;
}
