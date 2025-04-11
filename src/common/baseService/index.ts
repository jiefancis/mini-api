import { Repository } from 'typeorm';

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
      return await this.repository.delete(id);
    }
  }

  async findOne(id) {
    if (this.repository) {
      return await this.repository.findOne({ where: { id } });
    }
  }

  async findAll() {
    if (this.repository) {
      return await this.repository.find();
    }
  }

  async listPage(params) {
    if (this.repository) {
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
