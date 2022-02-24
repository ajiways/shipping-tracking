import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderInterface } from './interfaces/order.interface';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async saveOrder(order: OrderInterface) {
    await this.orderRepository
      .create({
        orderId: order.id,
        startLat: order.start.lat,
        startLng: order.start.lng,
        endLat: order.end.lat,
        endLng: order.end.lng,
        orderStatus: order.orderStatus,
      })
      .save();
  }

  async getOrder(orderId: string) {
    return await this.orderRepository.findOne({
      where: { order_id: orderId },
    });
  }
}
