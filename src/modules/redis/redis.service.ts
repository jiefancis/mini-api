import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisExpire } from 'src/constants/redis';

@Injectable()
export class RedisService {
  redisClient: Redis | null;

  constructor() {
    this.redisClient = new Redis({
      port: +(process.env.REDIS_PORT || 6379) as number, // Redis port
      host: process.env.REDIS_HOST || 'localhost', // Redis host

      db: 0, // Redis database
    });
  }

  /**
   * 设置redis缓存
   * @param key 键名
   * @param value 键值
   * @param milliseconds 过期时间,单位ms
   * @returns
   */
  async set(key: string, value: any, milliseconds?: number) {
    if (typeof value == 'object') {
      value = JSON.stringify(value);
    }
    return await this.redisClient.set(
      key,
      value,
      'PX',
      milliseconds || RedisExpire.UserCache,
    );
  }
  /**
   * 获取redis缓存
   * @param key 键名
   * @returns
   */
  async get(key: string) {
    return await this.redisClient.get(key);
  }
  /**
   * 移除redis缓存
   * @param keys 键名数组
   * @returns
   */
  async del(keys: string[]) {
    return await this.redisClient.del(keys);
  }
}
