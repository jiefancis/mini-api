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

@Injectable()
export class JwtGuard implements CanActivate {
  private readonly checkUrls: string[] = [
    // '/mini/order/v1/create',
    // '/mini/order/v1/list',
  ];

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const requestUrl = request.url;

    // todo 待补充
    const verifyUrls = ['/mini/order', '/mini/coupon', '/mini/collection'];
    if (!verifyUrls.some((url) => requestUrl.startsWith(url))) {
      return true;
    }

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('未登录');
    }
    // TODO: 验证token
    try {
      jwtVerify(token).then((res) => {
        if (!res) {
          throw new HttpException(
            'token已过期',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
          //   throw new UnauthorizedException('token已过期');
          return false;
        }
        return true;
      });
    } catch (err) {
      //   throw new UnauthorizedException('token已过期');
      throw new HttpException('token已过期', HttpStatus.INTERNAL_SERVER_ERROR);
      return false;
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ')?.[1];
    return type === 'Bearer' ? token : undefined;
  }
}
