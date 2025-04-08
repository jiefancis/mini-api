import { Body, Get, Post, Query } from '@nestjs/common';
import { ListPageDto } from 'src/dto/common.dto';
import { Cache } from 'cache-manager';
import { RedisKeyFormat } from 'src/constants/redis';
import { utilFormat } from 'src/utils/format';
import redisClient from 'src/common/redis';

export class BaseController {
  service: any;
  cacheManager: Cache;

  constructor(service, cacheManager?) {
    this.service = service;
    this.cacheManager = cacheManager;
  }

  @Post('v1/listPage')
  async listPage(@Body() data: ListPageDto) {
    const { pageNo, pageSize, ...restData } = data;
    const offset = (pageNo - 1) * pageSize;

    const queryData = {
      offset,
      pageSize,
      ...restData,
    };

    return await this.service.listPage(queryData);
  }

  @Get('v1/all')
  async findAll() {
    return await this.service.findAll();
  }

  @Get('v1/findById')
  async findById(@Query('id') id: string) {
    const userKey = utilFormat(RedisKeyFormat.UserCache, id);

    // if (this.cacheManager) {
    // console.log('cache hit');
    // const user = await this.cacheManager.get(userKey);
    let user = await redisClient.get(userKey);

    if (user) {
      return JSON.parse(user);
    }
    // }

    console.log('cache miss');
    user = await this.service.findOne(id);

    redisClient.setex(userKey, 10 * 60, JSON.stringify(user)); // 缓存10分钟，单位秒
    // if (this.cacheManager) {
    //   this.cacheManager.set(userKey, user, 1000 * 30); // 缓存10分钟，单位毫秒
    // }
    return user;
  }

  @Post('v1/delete')
  async delete(@Body() data) {
    return this.service.delete(data.id);
  }
}
