import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/common/baseService';

@Injectable()
export class GoodCategoryService extends BaseService {
  constructor(
    @InjectRepository(Category)
    readonly repository: Repository<Category>,
  ) {
    super(repository);
  }
}
