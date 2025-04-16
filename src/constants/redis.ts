// Object.freeze 防止修改
export const RedisKeyFormat = Object.freeze({
  UserCache: 'mini:user:%s',
  UserToken: 'mini:user:access_token:%s',

  OrderPayExpire: 'mini:order:pay:expire:%s', // 订单支付过期
});

export const RedisExpire = Object.freeze({
  UserCache: 1000 * 60 * 60 * 24 * 7, // 7天
  UserToken: 60 * 60, // 1小时

  OrderPayExpire: 15 * 60, // 15分钟
});
