export interface OrderState {
  order: Order | null;
  isLoading: boolean;
  loaded: boolean;
  error: boolean;
  id: number | null;
}

export enum OrderActionTypes {
  FETCH_ORDER = 'FETCH_ORDER',
  FETCH_ORDER_SUCCES = 'FETCH_ORDER_SUCCES',
  FETCH_ORDER_ERROR = 'FETCH_ORDER_ERROR',
  SEND_ORDER = 'SEND_ORDER',
  SEND_ORDER_SUCCES = 'SEND_ORDER_SUCCES',
  SEND_ORDER_ERROR = 'SEND_ORDER_ERROR'
}

interface FetchOrderError {
  type: OrderActionTypes.FETCH_ORDER_ERROR;
}
interface FetchOrder {
  type: OrderActionTypes.FETCH_ORDER;
}

interface FetchOrderSucces {
  type: OrderActionTypes.FETCH_ORDER_SUCCES;
  payload: Order;
}

interface SendOrder {
  type: OrderActionTypes.SEND_ORDER;
}
interface SendOrderSucces {
  type: OrderActionTypes.SEND_ORDER_SUCCES;
  payload: { id: number };
}
interface SendOrderError {
  type: OrderActionTypes.SEND_ORDER_ERROR;
}

export type OrderAction =
  | FetchOrder
  | FetchOrderSucces
  | FetchOrderError
  | SendOrder
  | SendOrderSucces
  | SendOrderError;

export interface Order {
  id: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  orderStatus: OrderStatus;
  currentLat?: number;
  currentLng?: number;
}

export enum OrderStatus {
  waitingOrder = 'Ожидание подтверждения оплаты',
  packingOrder = 'Заказ собирается',
  handedToCourier = 'Заказ передан курьеру',
  deliveredOrder = 'Заказ доставлен'
}
