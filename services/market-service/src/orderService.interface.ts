import { Observable } from "rxjs";

export enum OrderStatus {
  waitingOrder = 'Ожидание подтверждения оплаты',
  packingOrder = 'Заказ собирается',
  handedToCourier = 'Заказ передан курьеру',
  deliveredOrder = 'Заказ доставлен',
}

export interface CreateOrderRequest {  
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
}

export interface FindOrderRequest {
  id: string;
}

export interface FindOrderResponse {
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

export interface MarketService {
  createOrder(req: CreateOrderRequest): Observable<CreateOrderResponse>;
  changeStatus(req: ChangeStatusRequest): Observable<ChangeStatusResponse>;
  findOrder(id: FindOrderRequest): Observable<FindOrderResponse>;
}