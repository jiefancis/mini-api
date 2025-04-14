import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception?.getStatus?.() || 500;

    const exceptionMessage =
      exception?.response?.message ||
      exception?.message || //  exception?.message 比较粗糙，无法定位具体字段信息
      exception?.toString();

    response.status(status).json({
      code: status,
      // timestamp: new Date().toISOString(),
      // path: ctx.getRequest().url,

      message: exceptionMessage,
    });
  }
}
