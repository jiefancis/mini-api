import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GoodCategoryService } from './category.service';
import { GoodCreateDto } from 'src/dto/good.dto';
import { plainToClass } from 'class-transformer';
import { BaseController } from 'src/common/baseController';

@Controller('goodCategory')
export class GoodCategoryController extends BaseController {
  constructor(readonly service: GoodCategoryService) {
    super(service);
  }

  @Post('v1/create')
  async create(@Body() data: GoodCreateDto) {
    // 1. 手动转换数据类型

    // if (data.validity_start && data.validity_end) {
    //   data.validity_start = new Date(data.validity_start);
    //   data.validity_end = new Date(data.validity_end);
    // }

    // 2. 使用 class-transform 的 plainToClass

    const good = plainToClass(GoodCreateDto, data);

    return this.service.create(good);
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
