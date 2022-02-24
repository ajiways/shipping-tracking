export interface OrderState {
  order: Order | null;
  isLoading: boolean;
  loaded: boolean;
}

export enum OrderActionTypes {
  FETCH_ORDER = 'FETCH_ORDER',
  FETCH_ORDER_SUCCES = 'FETCH_ORDER_SUCCES'
}

interface FetchOrder {
  type: OrderActionTypes.FETCH_ORDER;
}

interface FetchOrderSucces {
  type: OrderActionTypes.FETCH_ORDER_SUCCES;
  payload: Order;
}

export type OrderAction = FetchOrder | FetchOrderSucces;

export interface Order {
  id: number;
  start: { lat: number; lng: number };
  end: { lat: number; lng: number };
  orderStatus: OrderStatus;
  coordinates: { lat: number; lng: number } | null;
}

export enum OrderStatus {
  waitingOrder = 'Ожидание подтверждения оплаты',
  packingOrder = 'Заказ собирается',
  handedToCourier = 'Заказ передан курьеру',
  deliveredOrder = 'Заказ доставлен'
}
