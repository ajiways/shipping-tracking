import { Observable } from 'rxjs';

export interface NavigationService {
  watchOrder(req: WatchRequest): Observable<WatchResponse>;
  connectionClose(req: CloseRequest): Observable<CloseResponse>;
}

export interface CloseRequest {
  id: number;
}

export interface CloseResponse {
  message: string;
}

export interface WatchResponse {
  id: number;
  orderStatus: OrderStatus;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  currentLat?: number;
  currentLng?: number;
}

export interface WatchRequest {
  id: number
}

export enum OrderStatus {
  waitingOrder = 'Ожидание подтверждения оплаты',
  packingOrder = 'Заказ собирается',
  handedToCourier = 'Заказ передан курьеру',
  deliveredOrder = 'Заказ доставлен',
}
