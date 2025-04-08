import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async queryAllUser() {
    const list = await this.userRepository.find();

    if (list?.length) {
      return list;
    }
    return [];
  }

  async queryUserById(id) {
    // const user = await this.userRepository.findOne(id);
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (user) {
      return user;
    }
    return null;
  }

  async createUser(data) {
    try {
      // const user = await this.userRepository.create(data);
      const res = await this.userRepository.save(data);
      console.log('创建用户res::', res);
      return res;
    } catch (error) {
      console.log('创建用户失败::', error);
    }
  }

  async updateUserById(id, data) {
    try {
      const res = await this.userRepository.update(id, data);
      console.log('更新用户res::', res);
      return res;
    } catch (error) {
      console.log('更新用户失败::', error);
    }
  }
}
