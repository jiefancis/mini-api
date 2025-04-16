import { HttpStatus } from '@nestjs/common';

export const ExceptionCodes = Object.freeze({
  // 通用异常
  UNKNOWN: {
    code: 10000,
    message: '未知异常',
  },
  // 参数校验异常
  PARAMS_VALIDATION: {
    code: 10001,
    message: '参数校验异常',
  },
  // 用户异常
  USER_NOT_FOUND: {
    code: 20000,
    message: '用户不存在',
  },
  // 用户昵称重复
  USER_NICKNAME_REPEAT: {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message: '用户昵称已使用',
  },
  // 用户名或密码错误
  USER_PASSWORD_ERROR: {
    code: 20003,
    message: '密码错误',
  },

  // 数据不存在
  RECORD_NOT_FOUND: {
    code: 30000,
    message: '未找到数据',
  },
  // 数据已存在
  RECORD_EXIST: {
    code: 30001,
    message: '数据已存在',
  },
  // 数据已删除
  RECORD_DELETED: {
    code: 30002,
    message: '数据已删除',
  },
});
