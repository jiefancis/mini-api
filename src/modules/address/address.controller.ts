import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AddressService } from './address.service';
import { BaseController } from 'src/common/baseController';

@Controller('address')
export class AddressController extends BaseController {
  constructor(readonly service: AddressService) {
    super(service);
  }

  @Post('v1/create')
  async create(@Body() data) {
    return this.service.create(data);
  }
}
