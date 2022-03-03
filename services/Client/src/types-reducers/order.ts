export interface OrderState {
  order: Order | null;
  isLoading: boolean;
  isLoadingCreate: boolean;
  isLoadingPaid: boolean;
  loaded: boolean;
  error: boolean;
  id: number | null;
}

export enum OrderActionTypes {
  FETCH_ORDER = 'FETCH_ORDER',
  FETCH_ORDER_ERROR = 'FETCH_ORDER_ERROR',
  FETCH_ORDER_SUCCESS = 'FETCH_ORDER_SUCCESS',
  SEND_ORDER = 'SEND_ORDER',
  SEND_ORDER_ERROR = 'SEND_ORDER_ERROR',
  SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS',
  PAID_ORDER = 'PAID_ORDER',
  PAID_ORDER_ERROR = 'PAID_ORDER_ERROR',
  PAID_ORDER_SUCCESS = 'PAID_ORDER_SUCCESS'
}

interface FetchOrderError {
  type: OrderActionTypes.FETCH_ORDER_ERROR;
}
interface FetchOrder {
  type: OrderActionTypes.FETCH_ORDER;
}
interface FetchOrderSucces {
  type: OrderActionTypes.FETCH_ORDER_SUCCESS;
  payload: Order;
}

interface SendOrder {
  type: OrderActionTypes.SEND_ORDER;
}
interface SendOrderError {
  type: OrderActionTypes.SEND_ORDER_ERROR;
}
interface SendOrderSucces {
  type: OrderActionTypes.SEND_ORDER_SUCCESS;
  payload: { id: number };
}

interface PaidOrder {
  type: OrderActionTypes.PAID_ORDER;
}
interface PaidOrderError {
  type: OrderActionTypes.PAID_ORDER_ERROR;
}
interface PaidOrderSuccess {
  type: OrderActionTypes.PAID_ORDER_SUCCESS;
}

export type OrderAction =
  | FetchOrder
  | FetchOrderSucces
  | FetchOrderError
  | SendOrder
  | SendOrderSucces
  | SendOrderError
  | PaidOrder
  | PaidOrderError
  | PaidOrderSuccess;

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
