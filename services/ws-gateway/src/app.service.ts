import { Server } from 'socket.io';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { WebSocketServer } from '@nestjs/websockets';
import { resolve } from 'path';
import { lastValueFrom } from 'rxjs';
import { NavigationService } from './service-definitions/navigation-service/navigation.service.interface';

@Injectable()
export class AppService implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'nav_service',
      protoPath: resolve(__dirname, './proto/service.proto'),
      url: `127.0.0.1:3001`,
    },
  })
  private readonly grpcClient: ClientGrpc;
  private navigationService: NavigationService;

  @WebSocketServer()
  private readonly server: Server;

  onModuleInit() {
    this.navigationService =
      this.grpcClient.getService<NavigationService>('NavigationService');
  }

  async getOrder(id: string) {
    const result = await lastValueFrom(this.navigationService.getOrder({ id }));

    if (!result) {
      this.server.emit('order.error', {
        message: 'Такого заказа нет',
        status: 322,
      });
      return;
    }

    this.server.emit('order.sent', result);
  }

  async transferStart(id: string) {
    const rxResponse = this.navigationService.transferStart({ id });
    const server = this.server;

    rxResponse.subscribe({
      next(msg) {
        server.emit('coordinates.send', msg);
      },
      complete() {
        console.log('Connection closed');
      },
      error(err) {
        console.log('Error', err);
      },
    });
  }
}
