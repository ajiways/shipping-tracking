import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { OrderDto } from './dto/order.dto';
import { OrderEntity, OrderStatus } from './order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService implements OnModuleInit {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  @Inject('KAFKA')
  private client: ClientKafka;

  async onModuleInit() {
    await this.client.connect();
  }

  async createOrder(data: OrderDto) {
    const order = this.orderRepository.create({
      startLat: data.startLat,
      startLng: data.startLng,
      endLat: data.endLat,
      endLng: data.endLng,
    });
    await order.save();

    this.client.emit('order.create', { order: order });
    return order;
  }

  async paid(id: number) {
    const candidate = await this.orderRepository.findOne({
      where: { id },
    });

    if (!candidate) {
      //..
    }

    const updatedOrder = await this.orderRepository
      .merge(candidate, { orderStatus: OrderStatus.packingOrder })
      .save();

    this.client.emit('order.change', { order: updatedOrder });

    return updatedOrder;
  }

  async handed(id: number) {
    console.log('HANDED', id);
    const candidate = await this.orderRepository.findOne({
      where: { id },
    });

    if (!candidate) {
      //..
    }

    const updatedOrder = await this.orderRepository
      .merge(candidate, { orderStatus: OrderStatus.handedToCourier })
      .save();

    this.client.emit('order.change', { order: updatedOrder });

    return updatedOrder;
  }

  async deliviried(id: number) {
    const candidate = await this.orderRepository.findOne({
      where: { id },
    });

    if (!candidate) {
      //..
    }

    const updatedOrder = await this.orderRepository
      .merge(candidate, { orderStatus: OrderStatus.deliveredOrder })
      .save();

    this.client.emit('order.change', { order: updatedOrder });

    return updatedOrder;
  }

  async findOrder(data: OrderDto) {
    this.client.emit('order.find', data);
  }
}
