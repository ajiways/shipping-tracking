import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { FindOrderRequest, MarketService } from './orderService.interface';
import { resolve } from 'path';
import {
  GRPC_HOST,
  MARKET_SERVICE,
  MARKET_SERVICE_METHOD,
} from './constants/constants';

@Injectable()
export class RestService implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: MARKET_SERVICE,
      protoPath: resolve(__dirname, '../contracts/orders.proto'),
      url: GRPC_HOST,
    },
  })
  private grpcClient: ClientGrpc;
  private marketService: MarketService;

  onModuleInit() {
    this.marketService = this.grpcClient.getService<MarketService>(
      MARKET_SERVICE_METHOD,
    );
  }

  async createOrder(data) {
    const res = await lastValueFrom(this.marketService.createOrder(data));

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
