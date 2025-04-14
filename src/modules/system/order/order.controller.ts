import { Body, Controller, Get, Post } from '@nestjs/common';
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
  async create(@Body() data: CreateOrderDto) {
    const payload = plainToClass(CreateOrderDto, data);
    const res = await this.service.create(payload);
    if (res) {
      console.log('create-order::', res);
      const orderNo = generateUUID();
      return {
        orderNo,
      };
    }
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
