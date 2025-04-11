import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GoodGroup } from 'src/entities/good_group.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/common/baseService';

@Injectable()
export class GoodGroupService extends BaseService {
  constructor(
    @InjectRepository(GoodGroup)
    readonly repository: Repository<GoodGroup>,
  ) {
    super(repository);
  }
}
