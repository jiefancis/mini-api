import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

import redisClient from './common/redis';

import { UserModule } from './modules/user/user.module';
import { ShopModule } from './modules/shop/shop.module';
import { OrderModule } from './modules/order/order.module';
import { GoodModule } from './modules/good/good.module';
import { GoodGroupModule } from './modules/good_group/good_group.module';
import { GoodCategoryModule } from './modules/good_category/good_category.module';
import { CouponModule } from './modules/coupon/coupon.module';
import { CollectionModule } from './modules/collection/collection.module';
import { AddressModule } from './modules/address/address.module';
import { HealthModule } from './modules/health/health.module';

// import { User } from './entities/user.entity';
// import { Shop } from './entities/shop.entity';
// import { Order } from './entities/order.entity';
// import { Good } from './entities/good.entity';
// import { GoodGroup } from './entities/good_group.entity';
// import { GoodCategory } from './entities/good_category.entity';
// import { Coupon } from './entities/coupon.entity';
// import { Collection } from './entities/collection.entity';
// import { Address } from './entities/address.entity';

@Module({
  imports: [
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
    GoodCategoryModule,
    CouponModule,
    CollectionModule,
    AddressModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
