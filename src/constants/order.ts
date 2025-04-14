export const OrderStatus = Object.freeze({
  // 待付款
  WAIT_PAY: 1,

  // 待发货
  WAIT_SEND: 2,

  // 待收货
  WAIT_RECEIVE: 3,

  // 已完成
  FINISHED: 4,

  // 已取消
  CANCEL: 5,

  // 待预约
  WAIT_APPOINTMENT: 6,

  // 退换/售后
  REFUND: 7,

  // 待评价
  WAIT_COMMENT: 8,
});

export const orderStatuCodes = Object.values(OrderStatus);
