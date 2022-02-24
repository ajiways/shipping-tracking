import { Coordinates } from '../../service-definitons/navigation.service.interface';

export interface OrderInterface {
  id: string;
  start: Coordinates;
  end: Coordinates;
  orderStatus: OrderStatus;
}

export enum OrderStatus {
  waitingOrder = 'Ожидание подтверждения оплаты',
  packingOrder = 'Заказ собирается',
  handedToCourier = 'Заказ передан курьеру',
  deliveredOrder = 'Заказ доставлен',
}
