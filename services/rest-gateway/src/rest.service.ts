import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  ChangeStatusRequest,
  FindOrderRequest,
  MarketService,
} from './orderService.interface';
import { resolve } from 'path';

@Injectable()
export class RestService implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'market_service',
      protoPath: resolve(__dirname, '../../contracts/orders.proto'),
      url: '127.0.0.1:3004',
    },
  })
  private grpcClient: ClientGrpc;
  private marketService: MarketService;

  onModuleInit() {
    this.marketService =
      this.grpcClient.getService<MarketService>('MarketService');
  }

  async createOrder(data) {
    console.log('Order created');
    const res = await lastValueFrom(this.marketService.createOrder(data));

    console.log(res);

    return res;
  }

  async findOrder(data: FindOrderRequest) {
    return await lastValueFrom(this.marketService.findOrder(data));
  }

  async handed(id: number) {
    return await lastValueFrom(this.marketService.handed({ id }));
  }

  async deliviried(id: number) {
    return await lastValueFrom(this.marketService.deliviried({ id }));
  }

  async paid(id: number) {
    return await lastValueFrom(this.marketService.paid({ id }));
  }
}
