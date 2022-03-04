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
        id: order.id,
        startLat: order.startLat,
        startLng: order.startLng,
        endLat: order.endLat,
        endLng: order.endLng,
        orderStatus: order.orderStatus,
      })
      .save();
  }

  async getOrder(id: number) {
    const result = await this.orderRepository.findOne({
      where: { id },
    });

    return result;
  }
}
