import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { BaseController } from 'src/common/baseController';

@Controller('collection')
export class CollectionController extends BaseController {
  constructor(readonly service: CollectionService) {
    super(service);
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

  @Post('v1/delete')
  async delete(@Body() data) {
    return this.service.delete(data.id);
  }

  @Get('v1/all')
  async findAll() {
    return await this.service.findAll();
  }

  @Get('v1/findById')
  async findById(@Query() data) {
    console.log('findById::', data);
    return await this.service.findOne(+data.id);
  }
}
