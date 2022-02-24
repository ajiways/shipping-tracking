import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { AppService } from './app.service';

@WebSocketGateway()
export class WebSocketController {
  constructor(private readonly appService: AppService) {}

  @SubscribeMessage('transfer.start')
  transferStart(@MessageBody('id') id: string) {
    this.appService.transferStart(id);
  }

  @SubscribeMessage('order.get')
  getOrder(@MessageBody('id') id: string) {
    this.appService.getOrder(id);
  }
}
