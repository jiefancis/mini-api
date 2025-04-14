import { Transform } from 'class-transformer';
import { IsDate, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

import { orderStatuCodes } from 'src/constants/order';

export class CreateOrderDto {
  // @IsString({ message: '订单编号必须为字符串' })
  // order_no: string;

  @IsNumber({}, { message: '订单总金额必须为数字' })
  total_amount: number;

  @IsNumber({}, { message: '订单金额必须为数字' })
  amount: number;

  @IsNumber({}, { message: '购买数量必须为数字' })
  count: number;

  @IsNumber({}, { message: '优惠金额必须为数字' })
  discount_amount: number;

  @IsNumber({}, { message: '支付金额必须为数字' })
  pay_amount: number;

  @IsOptional()
  @IsNumber(
    {},
    {
      message:
        '支付状态 1-待付款 2-待发货 3-待收货 4-已完成 5-已取消 6-待预约 7-退换/售后 8-待评价',
    },
  )
  @IsIn(orderStatuCodes, { message: '支付状态值不合法' })
  status: number;

  @IsNumber({}, { message: '店铺id必须为数字' })
  shop_id: number;

  @IsNumber({}, { message: '商品id为数字' })
  good_id: number;

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: '支付时间必须为日期 / 时间戳' })
  payAt: Date;

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: '发货时间必须为日期 / 时间戳' })
  sendAt: Date;

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: '预约时间必须为日期 / 时间戳' })
  appointAt: Date;

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: '退换/售后时间必须为日期 / 时间戳' })
  refundAt: Date;
}
