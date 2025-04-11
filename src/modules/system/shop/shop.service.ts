import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shop } from 'src/entities/shop.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/common/baseService';

@Injectable()
export class ShopService extends BaseService {
  constructor(
    @InjectRepository(Shop)
    readonly repository: Repository<Shop>,
  ) {
    super(repository);
  }
}
