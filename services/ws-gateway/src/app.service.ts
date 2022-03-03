import { Injectable } from '@nestjs/common';
import { ReplaySubject } from 'rxjs';
import {
  WatchRequest,
  WatchResponse,
} from './service-definitons/navigation.service.interface';
import { OrderService } from './order.service';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { OrderInterface } from './interfaces/order.interface';

@Injectable()
export class AppService {
  @Client({})
  private readonly grpcClient: ClientGrpc;

  constructor(private readonly orderService: OrderService) {}

  async getOrder(id: number) {
    return await this.orderService.getOrder(id);
  }

  startTransfer(data: OrderInterface) {
    const rxResponse = new ReplaySubject<WatchRequest>();

    rxResponse.next({
      id: data.id,
    });

    return rxResponse.asObservable();
  }

  async saveOrder(order: OrderInterface) {
    await this.orderService.saveOrder(order);
  }
}
