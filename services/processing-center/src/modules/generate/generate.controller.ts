import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GoogleMap } from 'src/api/api';
import { OrderDto, OrderStatus, OrderToWS } from '../dto/dataDto';
import { GenerateGateway } from './generate.service';

@Controller()
export class GenerateController {
  constructor(private readonly generateGateway: GenerateGateway) {}

  @MessagePattern('change.status')
  async generate(@Payload() data: OrderDto) {
    // Запрос за данными для генерации
    const response = await GoogleMap.getPolyline(data.start, data.end);
    // Проверка
    if (data.orderStatus === OrderStatus.packingOrder) {
      setTimeout(async () => {
        // change статус
        const order: OrderToWS = {
          end: data.end,
          orderId: data.orderId,
          orderStatus: OrderStatus.handedToCourier,
          start: data.start,
          data: response,
        };
        this.generateGateway.coordinatesGenerateToClient(order);
      }, 2500);
    }
  }
}
