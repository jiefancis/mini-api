import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GoodGroup } from 'src/entities/good_group.entity';
import { Group } from 'src/entities/group.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/common/baseService';

@Injectable()
export class GoodGroupService extends BaseService {
  constructor(
    @InjectRepository(Group)
    readonly repository: Repository<Group>,
    @InjectRepository(GoodGroup)
    private readonly goodGroupRepository: Repository<GoodGroup>,
  ) {
    super(repository);
  }
}
