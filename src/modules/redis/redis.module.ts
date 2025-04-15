import { Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis';

import { RedisService } from './redis.service';
import { RedisEventsService } from './redis-events.service';
import { OrderModule } from 'src/modules/system/order/order.module';
@Module({
  imports: [
    RedisModule.forRoot({
      type: 'single',
      // url: `redis://${process.env.REDIS_HOST || 'localhost'}:${+(process.env.REDIS_PORT || 6379)}`,
      // options: {
      //   db: 0, // 默认数据库
      // },
      options: {
        host: process.env.REDIS_HOST || 'localhost',
        port: +(process.env.REDIS_PORT || 6379),
        db: 0, // 默认数据库
      },
    }),
    OrderModule,
  ],
  providers: [RedisService, RedisEventsService],
  exports: [RedisService],
})
export class RedisConfigModule {}
