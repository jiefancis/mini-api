import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Good } from 'src/entities/good.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/common/baseService';

@Injectable()
export class GoodService extends BaseService {
  constructor(@InjectRepository(Good) readonly repository: Repository<Good>) {
    super(repository);
  }
}
