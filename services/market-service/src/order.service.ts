import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { OrderDto } from './dto/order.dto';
import { lastValueFrom } from 'rxjs'
import { OrderEntity } from './order.entity'
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderService implements OnModuleInit {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}
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
    await this.orderRepository.create({
      id: data.id,
      orderStatus: data.orderStatus,
      startLat: data.startLat,
      startLng: data.startLng,
      endLat: data.endLat,
      endLng: data.endLng,
    }).save();
    this.client.emit('order.create', data);
  }

  async changeStatus(data: OrderDto) {
    return await lastValueFrom(this.client.send('order.change', data));
  }

  async findOrder(data: OrderDto) {
    return await lastValueFrom(this.client.send('order.find', data));
  }
}
