import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';
import { RedisService } from 'src/modules/redis/redis.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, RedisService],
  exports: [UserService], // 导出UserService，使其可以在其他模块中使用
})
export class UserModule {}
