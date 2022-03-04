export interface Order {
  id: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  orderStatus: OrderStatus;
}

export enum OrderStatus {
  waitingOrder = 'Ожидание подтверждения оплаты',
  packingOrder = 'Заказ собирается',
  handedToCourier = 'Заказ передан курьеру',
  deliveredOrder = 'Заказ доставлен',
}

export interface OrderCoordinates {
  id: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  orderStatus: OrderStatus;
  currentLat: number;
  currentLng: number;
}

export interface OrderToWS {
  id: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  orderStatus: OrderStatus;
  data: string;
}

export interface id {
  id: number;
}

export interface ChangeStatus {
  id: number;
  orderStatus: OrderStatus;
}
