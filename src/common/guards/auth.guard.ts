import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { jwtVerify } from 'src/utils/jwt';
import { Reflector } from '@nestjs/core';
import { IS_PRIVATE_KEY } from '../decorator/public.decorator';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // const requestUrl = request.url;

    const isPrivate = this.reflector.getAllAndOverride<boolean>(
      IS_PRIVATE_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!isPrivate) {
      return true;
    }

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('未登录');
    }

    // TODO: 验证token
    const res = await jwtVerify(token);

    if (!res) {
      throw new HttpException('token已过期', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    request.user = res;
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const token = request.headers.authorization?.split('Bearer')?.[1]?.trim();

    return token;
  }
}
