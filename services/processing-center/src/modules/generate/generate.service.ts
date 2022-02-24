import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Inject, Logger, OnModuleInit } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { ClientKafka } from '@nestjs/microservices';

@WebSocketGateway(3002, { cors: true })
export class GenerateGateway
  implements
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnModuleInit
{
  @WebSocketServer()
  server: Server;

  async onModuleInit() {
    await this.kafkaClient.connect();
  }
  @Inject('coordinates')
  private readonly kafkaClient: ClientKafka;

  private logger: Logger = new Logger('AppGateway');
  private state: any[] = [];

  @SubscribeMessage('CoordinatesToServer')
  handleMessage(client: Socket, payload: any): void {
    // console.log(payload);
    this.kafkaClient.emit('coordinates.transfer', payload);
  }

  coordinatesGenerateToClient(response): void {
    this.server.emit('generateCoords', response);
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
