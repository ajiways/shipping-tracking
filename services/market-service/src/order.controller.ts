import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { DELIVIRIED_STATUS, GRPC_CREATE, GRPC_FIND, HANDED_STATUS, MARKET_SERVICE_METHOD, PAID_STATUS } from './constants/constants';
import { OrderDto } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @GrpcMethod(MARKET_SERVICE_METHOD, GRPC_CREATE)
  async createOrder(data: OrderDto) {
    return this.orderService.createOrder(data);
  }

  @GrpcMethod(MARKET_SERVICE_METHOD, DELIVIRIED_STATUS)
  async deliviried(data: { id: number }) {
    return this.orderService.deliviried(data.id);
  }

  @GrpcMethod(MARKET_SERVICE_METHOD, HANDED_STATUS)
  async handed(data: { id: number }) {
    return this.orderService.handed(data.id);
  }

  @GrpcMethod(MARKET_SERVICE_METHOD, PAID_STATUS)
  async paid(data: { id: number }) {
    return this.orderService.paid(data.id);
  }

  @GrpcMethod(MARKET_SERVICE_METHOD, GRPC_FIND)
  async findOrder(data: OrderDto) {
    return this.orderService.findOrder(data);
  }
}
