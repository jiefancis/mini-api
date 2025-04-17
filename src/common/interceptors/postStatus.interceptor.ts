import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { ObserveApi } from 'src/utils/metrics';

@Injectable()
export class PostStatusInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const start = Date.now();
    if (request.method === 'POST') {
      response.status(200);
    }

    // return next.handle().pipe(map((data) => data));
    return next.handle().pipe(
      map((data) => {
        // const ms = Date.now() - start;
        // ObserveApi(request, ms / 1000);
        return {
          code: 200,
          message: 'Success',
          data,
        };
      }),
    );
  }
}
