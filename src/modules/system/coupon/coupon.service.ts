import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon } from 'src/entities/coupon.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/common/baseService';

@Injectable()
export class CouponService extends BaseService {
  constructor(
    @InjectRepository(Coupon) readonly repository: Repository<Coupon>,
  ) {
    super(repository);
  }
}
