import {
  COORDINATES_END,
  COORDINATES_GENERATE,
  COORDINATES_TO_SERVER,
  WS_PORT,
} from './../../constants/constants';
import { OrderCoordinates, Order } from './../../interface/order';
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

@WebSocketGateway(WS_PORT, { cors: true })
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

  @SubscribeMessage(COORDINATES_TO_SERVER)
  handleMessage(client: Socket, payload: OrderCoordinates): void {
    this.processingService.sendCoordinates(payload);
  }

  @SubscribeMessage(COORDINATES_END)
  handleMessageCoordinates(client: Socket, payload: OrderCoordinates): void {
    this.processingService.deliviried(payload.id);
  }
  orderToClient(order: Order): void {
    this.server.emit(COORDINATES_GENERATE, order);
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
