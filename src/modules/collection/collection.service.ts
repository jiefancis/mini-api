import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Collection } from 'src/entities/collection.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/common/baseService';

@Injectable()
export class CollectionService extends BaseService {
  constructor(
    @InjectRepository(Collection) readonly repository: Repository<Collection>,
  ) {
    super(repository);
  }
}
