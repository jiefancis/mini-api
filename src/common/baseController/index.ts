import { Body, Get, Post, Query } from '@nestjs/common';
import { ListPageDto } from 'src/dto/common.dto';

export class BaseController {
  service: any;

  constructor(service) {
    this.service = service;
  }

  @Post('v1/listPage')
  async listPage(@Body() data: ListPageDto) {
    const { pageNo, pageSize, ...restData } = data;
    const offset = (pageNo - 1) * pageSize;

    const queryData = {
      offset,
      pageSize,
      ...restData,
    };

    return await this.service.listPage(queryData);
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

  @Post('v1/delete')
  async delete(@Body() data) {
    return this.service.delete(data.id);
  }
}
