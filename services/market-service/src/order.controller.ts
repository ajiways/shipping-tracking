import { Controller } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { OrderDto } from './dto/order.dto';
import { OrderStatus } from './order.entity';
import { OrderService } from './order.service';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @GrpcMethod('MarketService', 'CreateOrder')
  async createOrder(data: OrderDto) {
    return this.orderService.createOrder(data);
  }

  @GrpcMethod('MarketService', 'Deliviried')
  async deliviried(data: { id: number }) {
    console.log('DELIVIETWHEAHT');
    return this.orderService.deliviried(data.id);
  }

  @GrpcMethod('MarketService', 'Handed')
  async handed(data: { id: number }) {
    console.log('ABCDE');
    return this.orderService.handed(data.id);
  }

  @GrpcMethod('MarketService', 'Paid')
  async paid(data: { id: number }) {
    return this.orderService.paid(data.id);
  }

  @GrpcMethod('MarketService', 'FindOrder')
  async findOrder(data: OrderDto) {
    return this.orderService.findOrder(data);
  }
}
