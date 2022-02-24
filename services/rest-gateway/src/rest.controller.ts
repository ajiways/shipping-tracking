import { Body, Controller, Post } from '@nestjs/common';
import { ChangeStatusRequest, FindOrderRequest } from './orderService.interface';
import { RestService } from './rest.service';

@Controller() 
export class RestController {
  constructor(private readonly restService: RestService) {}

  @Post('/create')
  async createOrder() {
    return this.restService.createOrder()
  }

  @Post('/find')
  async findOrder(@Body() data: FindOrderRequest) {
    return this.restService.findOrder(data)
  }

  @Post('/change')
  async changeStatus(@Body() data: ChangeStatusRequest) {
    return this.restService.changeStatus(data)
  }
}
