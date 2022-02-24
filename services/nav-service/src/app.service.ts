import { Injectable } from '@nestjs/common';
import { ReplaySubject } from 'rxjs';
import {
  Order,
  TransferResponse,
} from '../service-definitons/navigation.service.interface';
import { OrderInterface } from './interfaces/order.interface';
import { OrderService } from './order.service';

@Injectable()
export class AppService {
  constructor(private readonly orderService: OrderService) {}

  async getOrder(orderId: string) {
    return await this.orderService.getOrder(orderId);
  }

  startTransfer() {
    const rxResponse = new ReplaySubject<TransferResponse>();

    rxResponse.next({
      coordinates: { lat: 1, lng: 2 },
      count: '1%',
      start: { lat: 1, lng: 2 },
      end: { lat: 1, lng: 2 },
    });

    return rxResponse.asObservable();
  }

  async saveOrder(order: OrderInterface) {
    await this.orderService.saveOrder(order);
  }
}
