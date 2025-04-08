import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post('v1/create')
  async create(@Body() data) {
    return this.addressService.create(data);
  }

  @Get('v1/list')
  async list(@Query('userId') userId: number) {
    return this.addressService.findAll(userId);
  }
}
