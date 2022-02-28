import { Inject, Injectable } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ChangeStatusRequest, FindOrderRequest, MarketService } from './orderService.interface';
import { v4 } from 'uuid'
import { resolve } from 'path';

@Injectable()
export class RestService {
  private marketService: MarketService;
  orderData = {
    startLat: 36.065941,
    startLng: 103.747669,
    endLat: 36.06486114292329,
    endLng: 103.75794504821553,
  }
  constructor(
    @Inject('MarketService') grpcClient: ClientGrpc
  ) {
    this.marketService = grpcClient.getService<MarketService>('MarketService')
  }
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'market_service',
      protoPath: resolve(__dirname, '../../contracts/orders.proto'),
      url: '127.0.0.1:3004',
    },
  })
  private grpcClient: ClientGrpc

  async createOrder() { 
    const result = await lastValueFrom(this.marketService.createOrder(this.orderData))
    return result;
  }

  async findOrder(data: FindOrderRequest) { 
    return await lastValueFrom(this.marketService.findOrder(data))
  }

  async changeStatus(data: ChangeStatusRequest) { 
    return await lastValueFrom(this.marketService.changeStatus(data))
  }

}
