import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ExceptionCodes } from 'src/constants/exception';

export class BaseService {
  repository: Repository<any>;

  constructor(repository) {
    this.repository = repository;
    // this.cacheManager = cacheManager;
  }

  async create(data) {
    if (this.repository) {
      return await this.repository.save(data);
    }
  }

  async update(id, data) {
    if (this.repository) {
      return await this.repository.update(id, data);
    }
  }

  async delete(id) {
    if (this.repository) {
      const result = await this.findOne(id);
      if (!result) {
        // return {
        //   message: '删除失败，未找到该记录',
        // };
        throw new NotFoundException(ExceptionCodes.RECORD_NOT_FOUND);
      }

      result.isDeleted = true;
      await this.repository.save(result);
      return {
        message: '删除成功',
      };
    }
  }

  async findOne(id) {
    if (this.repository) {
      return await this.repository.findOne({ where: { id, isDeleted: false } });
    }
  }

  async findAll() {
    if (this.repository) {
      return await this.repository.find({ where: { isDeleted: false } });
    }
  }

  async listPage(params) {
    if (this.repository) {
      if (!params.where) {
        params.where = { isDeleted: false };
      } else if ([null, undefined].includes(params.where.isDeleted)) {
        params.where.isDeleted = false;
      }

      return await this.repository.find({ ...params });
      // const { offset, pageSize, order } = params;

      // return await this.repository.find({
      //   skip: offset,
      //   take: pageSize,
      //   order,
      // });
    }
  }
}
