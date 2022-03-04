import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

export enum OrderStatus {
  waitingOrder = 'Ожидание подтверждения оплаты',
  packingOrder = 'Заказ собирается',
  handedToCourier = 'Заказ передан курьеру',
  deliveredOrder = 'Заказ доставлен',
}

@Entity('orders')
export class Order extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column({
    enum: OrderStatus,
  })
  orderStatus: OrderStatus;

  @Column({ type: 'float' })
  startLat: number;

  @Column({ type: 'float' })
  startLng: number;

  @Column({ type: 'float' })
  endLat: number;

  @Column({ type: 'float' })
  endLng: number;
}
