import { Controller } from '@nestjs/common';
import {
  GrpcMethod,
  GrpcStreamMethod,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { NAVIGATION_SERVICE } from '../misc/constants';
import {
  Order,
  OrderRequest,
  OrderResponse,
  TransferResponse,
} from '../service-definitons/navigation.service.interface';
import { AppService } from './app.service';
import { OrderInterface } from './interfaces/order.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod(NAVIGATION_SERVICE, 'getOrder')
  getOrder(data: OrderRequest): Observable<OrderResponse> {
    return new Observable((sub) => {
      const res = this.appService.getOrder(data.id);

      res.then((order) =>
        sub.next({
          status: order.orderStatus,
          start: { lat: order.startLat, lng: order.startLng },
          end: { lat: order.endLat, lng: order.endLng },
        }),
      );
    });
  }

  @GrpcStreamMethod(NAVIGATION_SERVICE, 'transferStart')
  transferStart(data: Order): Observable<TransferResponse> {
    return this.appService.startTransfer();
  }

  @MessagePattern('pattern')
  saveOrder(@Payload() data: OrderInterface) {
    this.appService.saveOrder(data);
  }

  @MessagePattern('pattern2')
  sendCoordinates() {
    this.appService.startTransfer();
  }
}
