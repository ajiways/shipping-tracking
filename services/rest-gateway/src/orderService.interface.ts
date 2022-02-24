import { Observable } from "rxjs";

export enum OrderStatus {
  waitingOrder = 'Ожидание подтверждения оплаты',
  packingOrder = 'Заказ собирается',
  handedToCourier = 'Заказ передан курьеру',
  deliveredOrder = 'Заказ доставлен',
}


export interface CreateOrderRequest {  
  orderStatus: OrderStatus;

   start: {
    lat: number,
    lng: number,
  };

  end: {
    lat: number,
    lng: number,
  };
}

export interface FindOrderRequest {
  orderId: string;
}

export interface FindOrderResponse {
  orderStatus: OrderStatus;

  start: {
   lat: number,
   lng: number,
 };

 end: {
   lat: number,
   lng: number,
 };
}

export interface CreateOrderResponse {
  orderId: string;
}

export interface ChangeStatusRequest {
  orderId: string;
  orderStatus: OrderStatus;
}

export interface ChangeStatusResponse {
  orderId: string;
  orderStatus: OrderStatus;
}

export interface MarketService {
  createOrder(id: string, req: CreateOrderRequest): Observable<CreateOrderResponse>;
  changeStatus(req: ChangeStatusRequest): Observable<ChangeStatusResponse>;
  findOrder(id: FindOrderRequest): Observable<FindOrderResponse>;
}