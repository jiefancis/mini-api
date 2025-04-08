import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PostStatusInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    if (request.method === 'POST') {
      response.status(200);
    }

    // return next.handle().pipe(map((data) => data));
    return next.handle().pipe(
      map((data) => ({
        code: 200,
        message: 'Success',
        data,
      })),
    );
  }
}
