import { Body, Controller, Post, Put } from '@nestjs/common';
import {
  ChangeStatusRequest,
  FindOrderRequest,
} from './orderService.interface';
import { RestService } from './rest.service';

@Controller()
export class RestController {
  constructor(private readonly restService: RestService) {}

  @Post('/create')
  async createOrder(@Body() data) {
    console.log(data);
    return this.restService.createOrder(data);
  }

  @Post('/find')
  async findOrder(@Body() data: FindOrderRequest) {
    return this.restService.findOrder(data);
  }

  @Put('/paid')
  async changeStatus(@Body('id') id: number) {
    console.log(id);
    return this.restService.paid(id);
  }
}
