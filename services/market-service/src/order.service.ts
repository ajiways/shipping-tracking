import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { OrderDto } from './dto/order.dto';
import { OrderEntity, OrderStatus } from './order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ORDER_CREATE, ORDER_CHANGE, ORDER_FIND, NOT_EXIST, KAFKA } from './constants/constants';

@Injectable()
export class OrderService implements OnModuleInit {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  @Inject(KAFKA)
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

    this.client.emit(ORDER_CREATE, { order: order });
    return order;
  }

  async paid(id: number) {
    const candidate = await this.orderRepository.findOne({
      where: { id },
    });

    if (!candidate) {
      return NOT_EXIST;
    }

    const updatedOrder = await this.orderRepository
      .merge(candidate, { orderStatus: OrderStatus.packingOrder })
      .save();

    this.client.emit(ORDER_CHANGE, { order: updatedOrder });

    return updatedOrder;
  }

  async handed(id: number) {
    const candidate = await this.orderRepository.findOne({
      where: { id },
    });

    if (!candidate) {
      return NOT_EXIST;
    }

    const updatedOrder = await this.orderRepository
      .merge(candidate, { orderStatus: OrderStatus.handedToCourier })
      .save();

    this.client.emit(ORDER_CHANGE, { order: updatedOrder });

    return updatedOrder;
  }

  async deliviried(id: number) {
    const candidate = await this.orderRepository.findOne({
      where: { id },
    });

    if (!candidate) {
      return NOT_EXIST;
    }

    const updatedOrder = await this.orderRepository
      .merge(candidate, { orderStatus: OrderStatus.deliveredOrder })
      .save();

    this.client.emit(ORDER_CHANGE, { order: updatedOrder });

    return updatedOrder;
  }

  async findOrder(data: OrderDto) {
    this.client.emit(ORDER_FIND, data);
  }
}
