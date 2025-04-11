import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GoodGroupService } from './group.service';
import { GroupCreateDto } from 'src/dto/group.dto';
import { plainToClass } from 'class-transformer';
import { BaseController } from 'src/common/baseController';

@Controller('group')
export class GoodGroupController extends BaseController {
  constructor(readonly service: GoodGroupService) {
    super(service);
  }

  @Post('v1/create')
  async create(@Body() data: GroupCreateDto) {
    // 1. 手动转换数据类型

    // if (data.validity_start && data.validity_end) {
    //   data.validity_start = new Date(data.validity_start);
    //   data.validity_end = new Date(data.validity_end);
    // }

    // 2. 使用 class-transform 的 plainToClass

    const good = plainToClass(GroupCreateDto, data);

    return this.service.create(good);
  }

  @Post('v1/update')
  async update(@Body() data: Partial<GroupCreateDto>) {
    const id = data.id;
    delete data.id;

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
