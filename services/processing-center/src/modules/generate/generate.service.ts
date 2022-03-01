import { OrderCoordinates, Order, OrderStatus } from './../../interface/order';
import { ProcessingService } from './../processing/processing.service';
import { Logger, Inject, forwardRef } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway(3002, { cors: true })
export class GenerateGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  constructor(
    @Inject(forwardRef(() => ProcessingService))
    private readonly processingService: ProcessingService,
  ) {}

  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('CoordinatesToServer')
  handleMessage(client: Socket, payload: OrderCoordinates): void {
    console.log(payload);
    this.server.emit('coordinatesServer', payload);
    this.processingService.sendCoordinates(payload);
  }

  @SubscribeMessage('CoordinatesEnd')
  handleMessageCoordinates(client: Socket, payload: number): void {
    console.log(payload, 'СМЕНА 1');
    this.processingService.changeStatus({
      id: payload,
      orderStatus: OrderStatus.deliveredOrder,
    });
  }
  orderToClient(order: Order): void {
    console.log(order);
    this.server.emit('generateCoords', order);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
