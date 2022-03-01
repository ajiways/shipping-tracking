import { Order, OrderStatus, OrderToWS } from './../../interface/order';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GoogleMap } from 'src/api/api';
import { ProcessingService } from './processing.service';
import { GenerateGateway } from '../generate/generate.service';

@Controller()
export class ProcessingController {
  constructor(
    private readonly processingService: ProcessingService,
    private readonly generateGateway: GenerateGateway,
  ) {}

  @MessagePattern('change.status')
  async generate(@Payload() data: Order) {
    // Запрос за данными для генерации

    const response = await GoogleMap.getPolyline(
      { lat: data.startLat, lng: data.startLng },
      { lat: data.endLat, lng: data.endLng },
    );
    // Проверка
    if (data.orderStatus === OrderStatus.packingOrder) {
      setTimeout(async () => {
        // change статус
        const order: OrderToWS = {
          id: data.id,
          startLat: data.startLat,
          startLng: data.startLng,
          orderStatus: OrderStatus.handedToCourier,
          endLat: data.endLat,
          endLng: data.endLng,
          data: response,
        };
        //order => kafka[changeStatus]
        this.processingService.changeStatus({
          id: order.id,
          orderStatus: order.orderStatus,
        });
        this.generateGateway.orderToClient(order);
      }, 2500);
    }
  }

  @Post('order')
  async generatez(@Body() data: Order) {
    // Запрос за данными для генерации

    const response = await GoogleMap.getPolyline(
      { lat: data.startLat, lng: data.startLng },
      { lat: data.endLat, lng: data.endLng },
    );
    // Проверка
    if (data.orderStatus === OrderStatus.packingOrder) {
      setTimeout(async () => {
        // change статус
        const order: OrderToWS = {
          id: data.id,
          startLat: data.startLat,
          startLng: data.startLng,
          orderStatus: OrderStatus.handedToCourier,
          endLat: data.endLat,
          endLng: data.endLng,
          data: response,
        };
        //order => kafka[changeStatus]
        this.processingService.changeStatus({
          id: order.id,
          orderStatus: order.orderStatus,
        });
        this.generateGateway.orderToClient(order);
      }, 10);
    }
  }
}
