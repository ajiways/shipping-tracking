import { Order, OrderStatus, OrderToWS } from './../../interface/order';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GoogleMap } from '../../api/api';
import { ProcessingService } from './processing.service';
import { GenerateGateway } from '../generate/generate.service';
import { ORDER_CHANGE } from '../../constants/constants';

@Controller()
export class ProcessingController {
  constructor(
    private readonly processingService: ProcessingService,
    private readonly generateGateway: GenerateGateway,
  ) {}

  @MessagePattern(ORDER_CHANGE)
  async generate(@Payload('value') data: { order: Order }) {
    if (data.order.orderStatus === OrderStatus.packingOrder) {
      const response = await GoogleMap.getPolyline(
        { lat: data.order.startLat, lng: data.order.startLng },
        { lat: data.order.endLat, lng: data.order.endLng },
      );

      setTimeout(async () => {
        // change статус
        const order: OrderToWS = {
          id: data.order.id,
          startLat: data.order.startLat,
          startLng: data.order.startLng,
          orderStatus: OrderStatus.handedToCourier,
          endLat: data.order.endLat,
          endLng: data.order.endLng,
          data: response,
        };
        //order => kafka[changeStatus]
        this.processingService.handed(data.order.id);
        this.generateGateway.orderToClient(order);
      }, 5000);
    }
  }
}
