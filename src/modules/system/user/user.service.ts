import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { BaseService } from 'src/common/baseService';
// import { CACHE_MANAGER } from '@nestjs/cache-manager';
// import { Cache } from 'cache-manager';

@Injectable()
export class UserService extends BaseService {
  constructor(@InjectRepository(User) readonly repository: Repository<User>) {
    super(repository);
  }

  async queryAllUser() {
    const list = await this.repository.find();

    if (list?.length) {
      return list;
    }
    return [];
  }

  async queryUserById(id) {
    // const user = await this.userRepository.findOne(id);
    const user = await this.repository.findOne({
      where: {
        id,
      },
    });
    if (user) {
      return user;
    }
    return null;
  }

  async updateUserById(id, data) {
    try {
      const res = await this.repository.update(id, data);
      console.log('更新用户res::', res);
      return res;
    } catch (error) {
      console.log('更新用户失败::', error);
    }
  }

  async findOne(where) {
    return await this.repository.findOne(where);
  }
}
