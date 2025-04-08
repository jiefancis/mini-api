import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GoodCategory } from 'src/entities/good_category.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/common/baseService';

@Injectable()
export class GoodCategoryService extends BaseService {
  constructor(
    @InjectRepository(GoodCategory)
    readonly repository: Repository<GoodCategory>,
  ) {
    super(repository);
  }
}
