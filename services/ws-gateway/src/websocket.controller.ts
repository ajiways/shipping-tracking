import { Inject } from '@nestjs/common';
import { Server } from 'socket.io';
import { ClientGrpc } from '@nestjs/microservices';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { NavigationService } from './service-definitions/navigation-service/navigation.service.interface';
import { Socket } from 'socket.io';
import { lastValueFrom } from 'rxjs';

@WebSocketGateway({ cors: true })
export class WebSocketController {
  private navigationService: NavigationService;

  constructor(
    @Inject('grpc')
    private readonly grpcClient: ClientGrpc,
  ) {
    this.navigationService =
      this.grpcClient.getService<NavigationService>('NavigationService');
  }

  @WebSocketServer()
  private readonly server: Server;

  async watchOrder(id: number) {
    const rxResponse = this.navigationService.watchOrder({ id });

    const server = this.server;

    rxResponse.subscribe({
      next(msg) {
        server.emit('watch.order', msg);
      },
      complete() {
        server.emit('order.delivieried');
      },
      error(err) {
        server.emit('watch.order', null);
        console.log('ОШИБОЧКА', err);
      },
    });
  }

  @SubscribeMessage('order.subscribe')
  transferStart(client: Socket, id: number) {
    console.log('connection id', client.id, id);
    client.on('disconnect', () => {
      console.log('disconnected', client.id, id);
      this.connectionClose(id);
    });
    this.watchOrder(id);
  }

  async connectionClose(id: number) {
    console.log('CLOSED CONNECTION', id);
    const res = await lastValueFrom(
      this.navigationService.connectionClose({ id }),
    );

    console.log(res);
  }
}
