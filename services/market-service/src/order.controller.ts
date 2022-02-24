import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { OrderDto } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @GrpcMethod('MarketService', 'CreateOrder')
  async createOrder(data: OrderDto ) {
    return this.orderService.createOrder(data)
  }
    
  @GrpcMethod('MarketService', 'ChangeStatus')
  async changeStatus(data: OrderDto ) {
    return this.orderService.changeStatus(data)
  }
    
  @GrpcMethod('MarketService', 'FindOrder')
  async findOrder(data: OrderDto ) {
    return this.orderService.findOrder(data)
  }
}
