import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GoodService } from './good.service';
import { GoodCreateDto } from 'src/dto/good.dto';
import { ListPageDto } from 'src/dto/common.dto';
import { plainToClass } from 'class-transformer';
import { BaseController } from 'src/common/baseController';
import * as _ from 'lodash';
import { Between, In, Like } from 'typeorm';

@Controller('good')
export class GoodController extends BaseController {
  constructor(readonly service: GoodService) {
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

  @Get('v1/findBy')
  async findBy(@Query('search') searchText: string) {
    return await this.service.findByName(searchText);
  }

  @Post('v1/listPage')
  async listPage(@Body() data: ListPageDto) {
    const { pageNo, pageSize, order, sort, ...restData } = data;
    const offset = (pageNo - 1) * pageSize;

    const orderBy = {};
    if (sort) {
      orderBy[sort] = order || 'desc';
    }

    const where: Record<string, any> = {};

    if (!_.isEmpty(restData)) {
      _.keys(restData).forEach((key) => {
        if (key === 'search') {
          where.name = Like(`%${restData[key]}%`);
        } else if (key === 'priceRange') {
          where.price = Between(restData[key]?.[0], restData[key]?.[1]);
        } else if (key === 'categoryIds') {
          where.categoryId = In(restData[key]);
        }
        delete restData[key];
      });
    }

    const queryData = {
      skip: offset,
      take: pageSize,
      order: orderBy,
      where,
      restData,
    };

    return await this.service.listPage(queryData);
  }
}
