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

  async tz() {
    const result = await this.repository.query(
      'SELECT @@session.time_zone AS tz',
    );
    console.log('当前会话时区:', result[0].tz); // 应输出 +08:00
    return result[0].tz;
  }
  async queryAllUser() {
    const list = await this.repository.find({ where: { isDeleted: false } });

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
      // console.log('更新用户res::', res);
      return res;
    } catch (error) {
      // console.log('更新用户失败::', error);
    }
  }

  async findOne(options) {
    options.where.isDeleted = false;
    return await this.repository.findOne(options);
  }
}
