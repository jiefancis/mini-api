import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Query,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
// import { plainToClass } from 'class-transformer';
// import { validate } from 'class-validator';

import { UserService } from './user.service';
import { BaseController } from 'src/common/baseController';
import { utilFormat } from 'src/utils/format';
import { RedisKeyFormat } from 'src/constants/redis';
import { CreateUserDto, UserLoginDto } from './dto/user.dto';
import { ExceptionCodes } from 'src/constants/exception';
import { jwtSign } from 'src/utils/jwt';

@Controller('user')
export class UserController extends BaseController {
  constructor(
    readonly service: UserService,
    @Inject(CACHE_MANAGER) readonly cacheManager: Cache,
  ) {
    super(service, cacheManager);
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
  async userLogin(@Body() data: UserLoginDto) {
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

    const accessToken = await jwtSign(user);
    return {
      accessToken,
      message: '登录成功',
    };
  }

  @Get('v1/queryUserById')
  async queryUserById(@Query('id') id: string) {
    const userKey = utilFormat(RedisKeyFormat.UserCache, id);

    const user = await this.service?.queryUserById?.(1);
    return user;
  }

  // 更新用户信息
  @Post('v1/updateUserInfo')
  async updateUser(@Body() data) {
    const userId = data.id;
    delete data.id;

    const res = await this.service.updateUserById(userId, data);
    return res;
  }
}
