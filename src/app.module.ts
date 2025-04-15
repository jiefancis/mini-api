import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { APP_GUARD } from '@nestjs/core';

import { UserModule } from './modules/system/user/user.module';
import { ShopModule } from './modules/system/shop/shop.module';
import { OrderModule } from './modules/system/order/order.module';
import { GoodModule } from './modules/system/good/good.module';
import { GoodGroupModule } from './modules/system/good_group/good_group.module';
import { CategoryModule } from './modules/system/category/category.module';
import { CouponModule } from './modules/system/coupon/coupon.module';
import { CollectionModule } from './modules/system/collection/collection.module';
import { AddressModule } from './modules/system/address/address.module';
import { HealthModule } from './modules/system/health/health.module';
import { GroupModule } from './modules/system/group/group.module';
import { RedisConfigModule } from './modules/redis/redis.module';

import { JwtGuard } from './common/guards/auth.guard';

// import { Address } from './entities/address.entity';
// import { Category } from './entities/category.entity';
// import { Collection } from './entities/collection.entity';
// import { Coupon } from './entities/coupon.entity';
// import { GoodGroup } from './entities/good_group.entity';
// import { Group } from './entities/group.entity';
// import { Good } from './entities/good.entity';
// import { Order } from './entities/order.entity';
// import { Shop } from './entities/shop.entity';
// import { User } from './entities/user.entity';

@Module({
  imports: [
    // TypeOrmModule.forFeature([
    //   Address,
    //   Category,
    //   Collection,
    //   Coupon,
    //   GoodGroup,
    //   Group,
    //   Good,
    //   Order,
    //   Shop,
    //   User,
    // ]),
    // 缓存
    CacheModule.register({
      isGlobal: true, // 配置全局缓存
      // store: {
      //   create: () => ({
      //     get: (key) => redisClient.get(key),
      //     set: (key, value, ttl) => redisClient.setex(key, ttl, value),
      //     del: (key) => redisClient.del(key),
      //   }),
      // },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('MYSQL_HOST'),
        port: +configService.get('MYSQL_PORT'),
        username: configService.get('MYSQL_USERNAME'),
        password: configService.get('MYSQL_PASSWORD'),
        database: configService.get('MYSQL_DATABASE'),
        autoLoadEntities: true,
        // entities: [
        //   User,
        //   Shop,
        //   Good,
        //   GoodGroup,
        //   GoodCategory,
        //   Coupon,
        //   Collection,
        //   Address,
        //   Order,
        // ],
        synchronize: process.env.NODE_ENV === 'development',
        // timezone: 'Asia/Shanghai', // 根据实际情况设置时区
        extra: {
          // sql_mode:
          //   'ONLY_FULL_GROUP_BY,ERROR_FOR_DIVISION_BY_ZERO,NO_ZERO_IN_DATE',
          sql_mode: 'NO_ENGINE_SUBSTITUTION', // 移除严格模式
        },
        // extra: {
        //   connectionLimit: 10,
        //   timezone: '+08:00', // 使用UTC格式设置时区
        // },
      }),
    }),

    UserModule,
    ShopModule,
    OrderModule,
    GoodModule,
    GoodGroupModule,
    CategoryModule,
    CouponModule,
    CollectionModule,
    AddressModule,
    HealthModule,
    GroupModule,
    RedisConfigModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
