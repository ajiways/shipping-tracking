import { Controller } from '@nestjs/common';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { Observable, ReplaySubject } from 'rxjs';
import { NAVIGATION_SERVICE } from './misc/constants';
import { AppService } from './app.service';
import {
  CloseRequest,
  CloseResponse,
  OrderStatus,
  WatchRequest,
  WatchResponse,
} from './service-definitons/navigation.service.interface';
import { OrderInterface } from './interfaces/order.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private connections: Map<number, ReplaySubject<WatchResponse>> = new Map<
    number,
    ReplaySubject<WatchResponse>
  >();

  @GrpcMethod(NAVIGATION_SERVICE, 'watchOrder')
  async getOrder(data: WatchRequest): Promise<Observable<WatchResponse>> {
    const order = await this.appService.getOrder(data.id);

    const rxResponse = new ReplaySubject<WatchResponse>();

    if (!order) {
      console.log('ОРДЕРА НЕТ');
      rxResponse.error({ message: 'ОРДЕРА НЕТУ ТАКОГО' });
      return;
    }
    console.log('AFTER CHECK', order);
    rxResponse.next(order);
    this.connections.set(order.id, rxResponse);
    return rxResponse;
  }

  @GrpcMethod(NAVIGATION_SERVICE, 'connectionClose')
  closeConnection(data: CloseRequest): Observable<CloseResponse> {
    console.log('DATA CLOSE', data.id);
    const candidate = this.connections.get(data.id);

    if (!candidate) {
      return new Observable((sub) => sub.next({ message: 'ошибка' }));
    }

    candidate.complete();

    return new Observable((sub) => sub.next({ message: 'Закрыто' }));
  }

  @MessagePattern('get.coordinates')
  handleCoordinates(@Payload('value') data: OrderInterface) {
    const candidate = this.connections.get(data.id);

    if (!candidate) {
      return;
    }

    candidate.next(data);
  }

  @MessagePattern('order.create')
  saveOrder(@Payload('value') data: { order: OrderInterface }) {
    this.appService.saveOrder(data.order);
  }

  @MessagePattern('order.change')
  handleStatusChange(@Payload('value') data: { order: OrderInterface }) {
    if (data.order.orderStatus === OrderStatus.deliveredOrder) {
      const candidate = this.connections.get(data.order.id);

      if (!candidate) {
        this.appService.saveOrder(data.order);
        return;
      }

      candidate.next(data.order);
      candidate.complete();
      this.connections.delete(data.order.id);
    }
    this.appService.saveOrder(data.order);
  }
}
