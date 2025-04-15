import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { OrderService } from './order.service';
import { BaseController } from 'src/common/baseController';
import { Private, Public } from 'src/common/decorator/public.decorator';
import { CreateOrderDto } from './dto/order.dto';
import { generateUUID } from 'src/utils/random';

@Private()
@Controller('order')
export class OrderController extends BaseController {
  constructor(readonly service: OrderService) {
    super(service);
  }

  @Public()
  @Get('v1/list')
  async list() {
    return this.service.findAll();
  }

  @Post('v1/create')
  async createOrder(@Body() data: CreateOrderDto, @Req() req) {
    const payload = plainToClass(CreateOrderDto, data);
    const order_no = generateUUID();
    const user_id = req.session.userId;

    const order = await this.service.createOrder({
      ...payload,
      order_no,
      user_id,
    });
    if (order) {
      console.log('create-order::', order);

      return {
        orderId: order.id,
        orderNo: order_no,
      };
    }

    return null;
  }

  @Post('v1/update')
  async update(@Body() data) {
    const id = data.id;
    delete data.id;

    if (data.validity_start) {
      data.validity_start = new Date(data.validity_start);
    }

    if (data.validity_end) {
      data.validity_end = new Date(data.validity_end);
    }

    return this.service.update(id, data);
  }

  // @Post('v1/delete')
  // async delete(@Body() data) {
  //   return this.service.delete(data.id);
  // }

  // @Get('v1/all')
  // async findAll() {
  //   return await this.service.findAll();
  // }

  // @Get('v1/findById')
  // async findById(@Query() data) {
  //   console.log('findById::', data);
  //   return await this.service.findOne(+data.id);
  // }
}
