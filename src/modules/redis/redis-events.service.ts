import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
// import { RedisExpire } from 'src/constants/redis';
// import { RedisService } from '@nestjs-modules/ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { OrderService } from 'src/modules/system/order/order.service';

@Injectable()
export class RedisEventsService implements OnModuleInit {
  redisClient: Redis | null;

  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly orderService: OrderService,
  ) {}

  async onModuleInit() {
    // 开启 Redis 键过期事件通知
    await this.redis.config('SET', 'notify-keyspace-events', 'Ex');

    const subscriber = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: +(process.env.REDIS_PORT || 6379),
    });

    // 订阅 Redis 键过期事件
    subscriber.subscribe('__keyevent@0__:expired', (err, count) => {
      if (err) {
        console.error('Failed to subscribe to Redis expired events:', err);
      } else {
        console.log(`Subscribed to ${count} channels`);
      }
    });

    // 处理过期事件
    subscriber.on('message', async (channel, message) => {
      if (message.startsWith('mini:order:pay:expire:')) {
        const orderId = message.split('mini:order:pay:expire:')[1];

        this.orderService.cancelOrder(orderId);

        // 这里可以添加实际的取消订单逻辑，比如更新数据库中订单状态等
        console.log(
          `Order ${orderId} has been automatically cancelled due to non - payment.`,
        );
      }
    });
  }
}
