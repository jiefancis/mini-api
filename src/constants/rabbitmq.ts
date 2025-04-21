export const RabbitMQ = {
  QUEUE_NAME: 'content_queue',
  DLX_EXCHANGE: 'dlx_exchange', // 死信交换机
  DLX_QUEUE: 'dlq', // 死信队列
  DLX_ROUTING_KEY: 'expired', // 死信路由键
  DLX_EXPIRED_TIME: 5000, // 死信队列消息过期时间 5s
};
