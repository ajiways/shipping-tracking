import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ChangeStatusRequest, FindOrderRequest, MarketService, OrderStatus } from './order.service';
import { v4 } from 'uuid'

@Injectable()
export class RestService {
  private marketService: MarketService;
  orderData = {
    orderStatus: OrderStatus.waitingOrder,
    start: { lat: 36.065941, lng: 103.747669 },
    end: { lat: 36.06486114292329, lng: 103.75794504821553 },
  }
  constructor(
    @Inject('MarketService') grpcClient: ClientGrpc
  ) {
    this.marketService = grpcClient.getService<MarketService>('MarketService')
  }

  async createOrder() { 
    const orderId = v4();
    const result = await lastValueFrom(this.marketService.createOrder(orderId, this.orderData))
    return result;
  }

  async findOrder(data: FindOrderRequest) { 
    return await lastValueFrom(this.marketService.findOrder(data))
  }

  async changeStatus(data: ChangeStatusRequest) { 
    return await lastValueFrom(this.marketService.changeStatus(data))
  }

}
