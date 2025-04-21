import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
// import { plainToClass } from 'class-transformer';
// import { validate } from 'class-validator';

import { UserService } from './user.service';
import { BaseController } from 'src/common/baseController';
import { utilFormat } from 'src/utils/format';
import { RedisKeyFormat } from 'src/constants/redis';
import { CreateUserDto, UserLoginDto } from './dto/user.dto';
import { ExceptionCodes } from 'src/constants/exception';
import { jwtSign } from 'src/utils/jwt';
import { Private } from 'src/common/decorator/public.decorator';
import { RedisService } from 'src/modules/redis/redis.service';

@Controller('user')
export class UserController extends BaseController {
  constructor(
    readonly service: UserService,
    private readonly redisService: RedisService,
  ) {
    super(service);
  }

  @Get('v1/tz')
  async tz() {
    return this.service.tz();
  }

  // 用户注册
  @Post('v1/register')
  async createUser(@Body() data: CreateUserDto) {
    const { nickname } = data;

    const existed = await this.service.findOne({ where: { nickname } });

    if (existed) {
      throw new HttpException(
        ExceptionCodes.USER_NICKNAME_REPEAT.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return await this.service.create(data);
  }

  // 用户登录
  @Post('v1/userLogin')
  async userLogin(@Body() data: UserLoginDto, @Req() req) {
    const user = await this.service.findOne({
      where: { nickname: data.nickname },
    });

    if (!user) {
      throw new HttpException(
        ExceptionCodes.USER_NOT_FOUND.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (user.password !== data.password) {
      throw new HttpException(
        ExceptionCodes.USER_PASSWORD_ERROR.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    req.session.userId = user.id;

    const accessToken = await jwtSign(user);
    return {
      accessToken,
      message: '登录成功',
    };
  }

  // wxLogin , 后续补充微信登录
  @Post('v1/wxLogin')
  async wxLogin(@Body() data) {
    const { phone } = data;
    const user = await this.service.findOne({
      where: { phone },
    });
    console.log('wxLogin::user', phone, user);

    if (user) {
      const accessToken = await jwtSign(user);
      return {
        userInfo: data,
        accessToken,
        message: '登录成功',
      };
    }

    const userInfo = {
      phone,
      nickname: Date.now().toString(32),
      password: '123456aBc',
      avatar: null,
      email: null,
      gender: 1,
      isDeleted: false,
    };
    try {
      const res = await this.createUser(userInfo);
      console.log('创建新用户::', res);
      const accessToken = await jwtSign(userInfo);
      return {
        accessToken,
        message: '登录成功',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 退出登录
  @Post('v1/logout')
  async logout(@Req() req: Request) {
    console.log(
      'req...user',
      (req as any).user,
      'session',
      (req.session as any).userId,
    );

    return {
      message: '退出登录成功',
    };
  }

  // 用户注销
  @Private()
  @Post('v1/signout')
  async signout(@Req() req: Request) {
    const userId = (req.session as any).userId;

    if (userId) {
      const res = await this.service.updateUserById(userId, {
        isDeleted: true,
      });
      if (res) {
        return {
          message: '注销成功',
        };
      }
    }
  }

  @Get('v1/queryUserById')
  async queryUserById(@Query('id') id: string) {
    const userKey = utilFormat(RedisKeyFormat.UserCache, id);

    const cacheUser = await this.redisService.get(userKey);
    if (cacheUser) {
      return JSON.parse(cacheUser);
    }

    const user = await this.service?.queryUserById?.(id);
    this.redisService.set(userKey, user);
    return user;
  }

  // 更新用户信息
  @Private()
  @Post('v1/updateUserInfo')
  async updateUser(@Body() data, @Req() req: Request) {
    const userId = (req.session as any).userId;
    if (userId) {
      const userKey = utilFormat(RedisKeyFormat.UserCache, userId);
      const res = await this.service.updateUserById(userId, data);
      this.redisService.set(userKey, res);
      return {
        message: '修改成功',
      };
    }
  }
}
