import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

// 日志
const logger = WinstonModule.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple(),
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        nestWinstonModuleUtilities.format.nestLike('MINI-SERVICE', {
          prettyPrint: true,
          colors: true,
        }),
      ),
    }),
    new DailyRotateFile({
      filename: './logs/application-error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '1m',
      maxFiles: '14d',
      level: 'error',
    }),

    new DailyRotateFile({
      filename: './logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '1m',
      maxFiles: '14d',
      level: 'info',
    }),
  ],
  // 程序出现异常信息（比如3000端口被占用）
  exceptionHandlers: [
    new DailyRotateFile({
      filename: './logs/exceptions-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '1m',
      maxFiles: '14d',
      // level: 'info'
    }),
  ],
});

export default logger;
