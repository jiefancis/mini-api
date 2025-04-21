import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';
import { RabbitMQ } from 'src/constants/rabbitmq';

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  private connection;
  private channel;
  private connectUri = `amqp://${process.env.RABBITMQ_USERNAME}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}`;

  async onModuleInit() {
    this.initRabbitMQ();
  }

  async onModuleDestroy() {
    console.log('关闭连接');
    // 关闭连接
    await this.connection.close();
    await this.channel.close();
  }

  async initRabbitMQ() {
    try {
      // 建立与 RabbitMQ 服务器的连接
      this.connection = await amqp.connect(this.connectUri);
      // 创建一个通道
      this.channel = await this.connection.createChannel();

      // 声明死信交换器
      await this.channel.assertExchange(RabbitMQ.DLX_EXCHANGE, 'direct', {
        durable: true,
      });
      // 声明死信队列
      await this.channel.assertQueue(RabbitMQ.DLX_QUEUE, {
        durable: true,
        arguments: {
          'x-queue-type': 'classic',
        },
      });
      // 将死信队列绑定到死信交换器
      await this.channel.bindQueue(
        RabbitMQ.DLX_QUEUE,
        RabbitMQ.DLX_EXCHANGE,
        RabbitMQ.DLX_ROUTING_KEY,
      );

      // 声明主队列，并设置消息过期时间和死信交换器
      await this.channel.assertQueue(RabbitMQ.QUEUE_NAME, {
        messageTtl: RabbitMQ.DLX_EXPIRED_TIME, // 消息过期时间为 5 秒
        deadLetterExchange: RabbitMQ.DLX_EXCHANGE, // 设置死信交换器
        deadLetterRoutingKey: RabbitMQ.DLX_ROUTING_KEY, // 设置死信路由键
      });

      // // 开始消费主队列中的消息
      // this.consumeMessages();

      // 开始监听死信队列中的过期消息
      this.consumeExpiredMessages();
      console.log('RabbitMQ 连接已建立');
      // 监听连接关闭事件
      this.connection.on('close', async () => {
        console.log('RabbitMQ 连接已关闭，尝试重新连接...');
        await this.initRabbitMQ();
      });

      // 监听连接错误事件
      this.connection.on('error', async (err) => {
        console.error('RabbitMQ 连接出现错误:', err);
        await this.initRabbitMQ();
      });
    } catch (error) {
      console.error('Error connecting to RabbitMQ:', error);
    }
  }

  sendMessage(message: any) {
    // // 向指定队列发送消息
    // this.channel.sendToQueue(queue, Buffer.from(message));

    // 发送消息时指定消息级别 TTL（可选）
    const options = {
      // expiration: '5000', // 消息级别 TTL（覆盖队列设置）
      // persistent: true, // 消息持久化
    };
    const sent = this.channel.publish(
      '',
      RabbitMQ.QUEUE_NAME,
      Buffer.from(JSON.stringify(message)),
      options,
    );
    if (sent) {
      console.log('Message sent:', JSON.stringify(message));
    } else {
      console.warn('Message returned to queue');
    }
  }

  async consumeMessages() {
    // 从队列中消费消息
    this.channel.consume('test-queue', (msg) => {
      if (msg) {
        console.log(`Received message: ${msg.content.toString()}`);
        // 确认消息已被处理
        this.channel.ack(msg);
      }
    });
  }

  async consumeExpiredMessages() {
    // 从死信队列中消费过期消息
    this.channel.consume(RabbitMQ.DLX_QUEUE, (msg) => {
      if (msg) {
        console.log(`Received expired message: ${msg.content.toString()}`);
        // 确认过期消息已被处理
        this.channel.ack(msg);
      }
    });
  }
}
