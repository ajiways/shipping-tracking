import { Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import {
  NavigationService,
  WatchResponse,
} from './service-definitions/navigation-service/navigation.service.interface';
import { Socket } from 'socket.io';
import { lastValueFrom } from 'rxjs';
import { Connection } from './interfaces/connections.interface';

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

  private connections: Array<Connection> = [];

  async watchOrder(id: number) {
    const connection = this.connections.find(
      (connection) => connection.orderId === id,
    );

    const rxResponse = this.navigationService.watchOrder({ id });
    console.log(`Открыл grpc stream для ордера ${id}`)
    rxResponse.subscribe({
      next(msg: WatchResponse) {
        connection.clients.forEach((client) => {
          client.socket.emit('watch.order', msg);
        });
      },
      complete() {
        console.log('Соединение закрыто, заказ доставлен');
      },
      error(err) {
        connection.clients.forEach((client) => {
          client.socket.emit('watch.order', null);
        });
        console.log('ОШИБОЧКА', err);
      },
    });
  }

  @SubscribeMessage('order.subscribe')
  transferStart(client: Socket, id: number) {
    console.log('connection id', client.id, id);
    client.on('disconnect', () => {
      console.log('disconnected', client.id, id);
      const connectionToClose = this.connections.find(
        (connection) => connection.orderId === id,
      );

      connectionToClose.clients = connectionToClose.clients.filter(
        (clientItem) => {
          return clientItem.clientId !== client.id;
        },
      );

      if (!connectionToClose.clients.length) {
        this.connections = this.connections.filter(
          (connection) => connection.orderId !== id,
        );
        console.log(`Клиентов больше нет, закрываю grpc stream для ордера ${id}`)
        this.connectionClose(id);
        return;
      }
    });
    const connectionCandidate = this.connections.find(
      (connection) => connection.orderId === id,
    );

    if (connectionCandidate) {
      connectionCandidate.clients.push({ clientId: client.id, socket: client });
      this.watchOrder(id);
      return;
    }

    this.connections.push({
      orderId: id,
      clients: [{ clientId: client.id, socket: client }],
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
