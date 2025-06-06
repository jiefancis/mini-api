import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GoodCategoryService } from './category.service';
import { GoodCreateDto } from './dto/good.dto';
import { BaseController } from 'src/common/baseController';

@Controller('category')
export class GoodCategoryController extends BaseController {
  constructor(readonly service: GoodCategoryService) {
    super(service);
  }

  @Post('v1/update')
  async update(@Body() data: Partial<GoodCreateDto>) {
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
