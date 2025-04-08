import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { BaseController } from 'src/common/baseController';
@Controller('user')
export class UserController extends BaseController {
  constructor(readonly service: UserService) {
    super(service);
  }

  @Get('v1/queryUserById')
  async queryUserById() {
    const user = await this.service?.queryUserById?.(1);
    return user;
  }

  // 用户注册
  @Post('v1/register')
  async createUser(@Body() data) {
    const res = await this.service.create(data);
    return res;
  }

  // 更新用户信息
  @Post('v1/updateUserInfo')
  async updateUser(@Body() data) {
    const userId = data.id;
    delete data.id;

    const res = await this.service.updateUserById(userId, data);
    return res;
  }
}
