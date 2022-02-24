import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { OrderDto } from './dto/order.dto';
import { lastValueFrom } from 'rxjs'
@Injectable()
export class OrderService implements OnModuleInit{
  @Client({
      transport: Transport.KAFKA,
      options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'market-service',
      }
    }
  })
  private client: ClientKafka

  async onModuleInit() {
      this.client.subscribeToResponseOf('order.change');
      this.client.subscribeToResponseOf('order.find');
      await this.client.connect();
  }

  async createOrder(data: OrderDto) {
    this.client.emit('order.create', data);
  }

  async changeStatus(data: OrderDto) {
    return await lastValueFrom(this.client.send('order.change', data));
  }

  async findOrder(data: OrderDto) {
    return await lastValueFrom(this.client.send('order.find', data));
  }
}
