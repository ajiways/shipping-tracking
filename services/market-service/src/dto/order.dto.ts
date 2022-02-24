import { IsNumber, Min } from "class-validator";

export enum OrderStatus {
  waitingOrder = 'Ожидание подтверждения оплаты',
  packingOrder = 'Заказ собирается',
  handedToCourier = 'Заказ передан курьеру',
  deliveredOrder = 'Заказ доставлен',
}

export class OrderDto {
   @IsNumber()
   @Min(1)
   orderId: number;
   
   orderStatus: string;

   end: {
     lat: number,
     lng: number,
   };

   start: {
    lat: number,
    lng: number,
  };
}
