import Redis from 'ioredis';

const redisClient = new Redis({
  port: +(process.env.REDIS_PORT || 6379) as number, // Redis port
  host: process.env.REDIS_HOST || 'localhost', // Redis host

  db: 0, // Redis database
});

export default redisClient;
