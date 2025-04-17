import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { PostStatusInterceptor } from './common/interceptors/postStatus.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { API_PREFIX } from 'src/config/api';
import * as session from 'express-session';
import logger from 'src/config/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger });
  // 全局拦截器
  app.useGlobalInterceptors(new PostStatusInterceptor());

  // 全局过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // 全局作用域管道 dto 验证有关
  app.useGlobalPipes(new ValidationPipe());

  // 设置全局api前缀为 mini
  app.setGlobalPrefix(API_PREFIX);

  // 全局守卫
  // app.useGlobalGuards(new JwtGuard());

  // 会话存储
  app.use(
    session({
      secret: 'SID',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
    }),
  );

  // 跨域
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
  console.log(
    `app serve runing at http://localhost:${process.env.PORT || 3000}`,
  );
}
bootstrap();
