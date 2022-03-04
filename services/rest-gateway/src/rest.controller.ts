import { Body, Controller, Post, Put } from '@nestjs/common';
import { ORDER_ID, POST_CREATE, POST_FIND, PUT_PAID } from './constants/constants';
import {
  FindOrderRequest,
} from './orderService.interface';
import { RestService } from './rest.service';

@Controller()
export class RestController {
  constructor(private readonly restService: RestService) {}

  @Post(POST_CREATE)
  async createOrder(@Body() data) {
    return this.restService.createOrder(data);
  }

  @Post(POST_FIND)
  async findOrder(@Body() data: FindOrderRequest) {
    return this.restService.findOrder(data);
  }

  @Put(PUT_PAID)
  async changeStatus(@Body(ORDER_ID) id: number) {
    return this.restService.paid(id);
  }
}
