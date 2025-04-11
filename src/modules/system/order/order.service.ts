import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/common/baseService';

@Injectable()
export class OrderService extends BaseService {
  constructor(
    @InjectRepository(Order)
    readonly repository: Repository<Order>,
  ) {
    super(repository);
  }
}
