export interface OrderDto {
  orderId: string;
  start: { lat: number; lng: number };
  end: { lat: number; lng: number };
  orderStatus: OrderStatus;
}

export enum OrderStatus {
  waitingOrder = 'Ожидание подтверждения оплаты',
  packingOrder = 'Заказ собирается',
  handedToCourier = 'Заказ передан курьеру',
  deliveredOrder = 'Заказ доставлен',
}

export interface OrderToWS {
  orderId: string;
  start: { lat: number; lng: number };
  end: { lat: number; lng: number };
  orderStatus: OrderStatus;
  data: string;
}
