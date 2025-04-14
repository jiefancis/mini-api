import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import * as _ from 'lodash';

import { GoodService } from './good.service';
import { GoodCreateDto } from './dto/good.dto';
import { ListPageDto } from 'src/dto/common.dto';
import { plainToClass } from 'class-transformer';
import { BaseController } from 'src/common/baseController';
import { listPageParamsFormat } from 'src/utils/format';

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

  @Get('v1/detail')
  async findById(@Query('id') id) {
    const good = await this.service.findOne(+id);
    if (good.isDeleted) {
      return new HttpException('商品已删除', HttpStatus.NOT_FOUND);
    }
    return good;
  }

  @Get('v1/findBy')
  async findBy(@Query('search') searchText: string) {
    return await this.service.findByName(searchText);
  }

  @Post('v1/listPage')
  async listPage(@Body() data: ListPageDto) {
    const { pageNo, pageSize, order, sort, groupIds = [] } = data;
    const offset = (pageNo - 1) * pageSize;

    const orderBy = {};
    if (sort) {
      orderBy[sort] = order || 'desc';
    }

    const where: Record<string, any> = listPageParamsFormat(data);

    const queryData = {
      skip: offset,
      take: pageSize + 1, // c端使用 size + 1 来判断是否还有更多数据
      order: orderBy,
      where,
      groupIds,
    };

    const list = await this.service.listPage(queryData);
    const hasMore = list.length > pageSize;

    return {
      list,
      hasMore,
    };
  }
}
