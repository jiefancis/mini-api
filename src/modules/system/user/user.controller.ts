import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { BaseController } from 'src/common/baseController';
import { utilFormat } from 'src/utils/format';
import { RedisKeyFormat } from 'src/constants/redis';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
@Controller('user')
export class UserController extends BaseController {
  constructor(
    readonly service: UserService,
    @Inject(CACHE_MANAGER) readonly cacheManager: Cache,
  ) {
    super(service, cacheManager);
  }

  @Get('v1/queryUserById')
  async queryUserById(@Query('id') id: string) {
    const userKey = utilFormat(RedisKeyFormat.UserCache, id);

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
