import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // 查询所有用户
  @Get('v1/queryAllUser')
  async queryAllUser() {
    console.log('进入userController');
    const users = await this.userService.queryAllUser();
    return users;
  }

  @Get('v1/queryUserById')
  async queryUserById() {
    const user = await this.userService?.queryUserById?.(1);
    return user;
  }

  // 用户注册
  @Post('v1/registry')
  async createUser(@Body() data) {
    const res = await this.userService.createUser(data);
    return res;
  }

  // 更新用户信息
  @Post('v1/updateUserInfo')
  async updateUser(@Body() data) {
    const userId = data.id;
    delete data.id;

    const res = await this.userService.updateUserById(userId, data);
    return res;
  }
}
