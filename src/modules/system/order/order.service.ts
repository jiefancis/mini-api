import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

import { BaseService } from 'src/common/baseService';
import { Order } from 'src/entities/order.entity';
import { RedisKeyFormat, RedisExpire } from 'src/constants/redis';
import { utilFormat } from 'src/utils/format';
import { OrderStatus } from 'src/constants/order';
import { RabbitMQService } from 'src/modules/rabbitmq/rabbitmq-amqplib.service';

@Injectable()
export class OrderService extends BaseService {
  constructor(
    @InjectRepository(Order)
    readonly repository: Repository<Order>,
    @InjectRedis() private readonly redis: Redis,
    private readonly rabbitMQService: RabbitMQService,
  ) {
    super(repository);
  }

  // async onModuleInit() {
  //   // 开启 Redis 键过期事件通知
  //   await this.redis.config('SET', 'notify-keyspace-events', 'Ex');

  //   const subscriber = new Redis({
  //     // host: 'localhost',
  //     // port: 6379,
  //     host: process.env.REDIS_HOST || 'localhost',
  //     port: +(process.env.REDIS_PORT || 6379),
  //   });

  //   // 订阅 Redis 键过期事件
  //   subscriber.subscribe('__keyevent@0__:expired', (err, count) => {
  //     if (err) {
  //       console.error('Failed to subscribe to Redis expired events:', err);
  //     } else {
  //       console.log(`Subscribed to ${count} channels`);
  //     }
  //   });

  //   // 处理过期事件
  //   subscriber.on('message', async (channel, message) => {
  //     if (message.startsWith('mini:order:pay:expire:')) {
  //       const orderId = message.split('mini:order:pay:expire:')[1];
  //       // 这里可以添加实际的取消订单逻辑，比如更新数据库中订单状态等
  //       console.log(
  //         `Order ${orderId} has been automatically cancelled due to non - payment.`,
  //       );
  //     }
  //   });
  // }

  async createOrder(data) {
    const order = await this.repository.save(data);

    const redisKey = utilFormat(RedisKeyFormat.OrderPayExpire, order.id);
    // 设置订单过期时间为 15 分钟（900 秒）
    await this.redis.setex(redisKey, RedisExpire.OrderPayExpire, 'unpaid');

    await this.rabbitMQService.sendMessage(data);

    return order;
  }

  async cancelOrder(orderId) {
    // 取消订单逻辑
    const order = await this.findOne(orderId);
    if (order.status === OrderStatus.WAIT_PAY) {
      return this.repository.update(orderId, { status: OrderStatus.CANCEL });
    }
  }
}
