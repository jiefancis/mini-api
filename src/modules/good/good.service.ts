import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Good } from 'src/entities/good.entity';
import { In, Like, Repository } from 'typeorm';
import { BaseService } from 'src/common/baseService';
import { GoodGroup } from 'src/entities/good_group.entity';

@Injectable()
export class GoodService extends BaseService {
  constructor(
    @InjectRepository(Good) readonly repository: Repository<Good>,
    @InjectRepository(GoodGroup)
    private readonly goodGroupRepository: Repository<GoodGroup>,
  ) {
    super(repository);
  }

  // 根据商品名 模糊搜索
  async findByName(searchText: string) {
    return this.repository.find({
      where: {
        name: Like(`%${searchText}%`),
      },
    });
  }

  async listPage(params) {
    if (this.repository) {
      const { restData } = params;

      if (restData.groupIds?.length) {
        const where: Record<string, any> = {};
        where.groupId = In(restData.groupIds);
        // const goods = await this.goodGroupRepository.find({ where });
      }
      delete params.restData;
      const list = await this.repository.find({ ...params });
      return list;
    }
  }
}
