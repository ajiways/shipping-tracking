import { IsNumber, IsString, Min } from 'class-validator';
import { OrderStatus } from 'src/order.entity';

export class OrderDto {
  @IsNumber()
  @Min(1)
  id: number;

  @IsString()
  orderStatus: OrderStatus;

  @IsNumber()
  startLat: number;

  @IsNumber()
  startLng: number;

  @IsNumber()
  endLat: number;

  @IsNumber()
  endLng: number;
}
