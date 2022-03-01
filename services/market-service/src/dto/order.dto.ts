import { IsNumber, Min } from "class-validator";

export class OrderDto {
   @IsNumber()
   @Min(1)
   id: number;
   
   orderStatus: string;

   startLat: number;

   startLng: number;

   endLat: number;

   endLng: number;
}
