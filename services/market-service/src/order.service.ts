import { Injectable } from '@nestjs/common';
import { OrdersEntity } from './order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrdersEntity)
    private readonly orderRepository: Repository<OrdersEntity>,
  ) {}

  async findOne(id: number): Promise<OrdersEntity[]> {
    return await this.orderRepository.find({ where: { customerId: id } });
  }
}
