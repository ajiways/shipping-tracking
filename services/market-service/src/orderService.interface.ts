import { Observable } from 'rxjs';

export enum OrderStatus {
  waitingOrder = 'Ожидание подтверждения оплаты',
  packingOrder = 'Заказ собирается',
  handedToCourier = 'Заказ передан курьеру',
  deliveredOrder = 'Заказ доставлен',
}

export interface CreateOrderRequest {
  id: number;
  orderStatus: OrderStatus;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
}

export interface FindOrderRequest {
  id: string;
}

export interface FindOrderResponse {
  id: number;
  orderStatus: OrderStatus;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
}

export interface CreateOrderResponse {
  id: string;
}

export interface ChangeStatusRequest {
  id: string;
  orderStatus: OrderStatus;
}

export interface ChangeStatusResponse {
  id: string;
  orderStatus: OrderStatus;
}

export interface UpdatedOrder {
  id: number;
  orderStatus: OrderStatus;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
}

export interface MarketService {
  createOrder(req: CreateOrderRequest): Observable<CreateOrderResponse>;
  findOrder(id: FindOrderRequest): Observable<FindOrderResponse>;
  handed(data: { id: number }): Observable<UpdatedOrder>;
  deliviried(data: { id: number }): Observable<UpdatedOrder>;
  paid(data: { id: number }): Observable<UpdatedOrder>;
}
