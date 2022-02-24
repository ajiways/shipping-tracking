import { Observable } from 'rxjs';

export interface NavigationService {
  transferStart(order: Order): Observable<TransferResponse>;
  getOrder(req: OrderRequest): Observable<OrderResponse>;
}

export interface Order {
  id: string;
}

export interface OrderRequest {
  id: string;
}

export interface OrderResponse {
  status: OrderStatus;
  end: Coordinates;
  start: Coordinates;
}

export interface TransferResponse {
  coordinates: Coordinates;
  count: string;
  end: Coordinates;
  start: Coordinates;
}

interface Coordinates {
  lat: number;
  lng: number;
}

export enum OrderStatus {
  waitingOrder = 'Ожидание подтверждения оплаты',
  packingOrder = 'Заказ собирается',
  handedToCourier = 'Заказ передан курьеру',
  deliveredOrder = 'Заказ доставлен',
}
