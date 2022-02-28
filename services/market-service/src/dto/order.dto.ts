import { IsNumber, Min } from "class-validator";

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
