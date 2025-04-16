import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Order extends BaseEntity {
  @Column({ comment: '订单编号' })
  order_no: string;

  @Column({ comment: '订单总金额' })
  total_amount: number;

  @Column({ comment: '订单金额' })
  amount: number;

  @Column({ comment: '购买数量', default: 1 })
  count: number;

  @Column({ comment: '优惠金额', default: 0 })
  discount_amount: number;

  @Column({ comment: '支付金额' })
  pay_amount: number;

  @Column({
    comment: '支付状态, // 1 待付款 2 待发货 3 待收货 4 待预约 5 退换/售后',
    default: 1,
  })
  status: number;

  @Column({ comment: '店铺id' })
  shop_id: number;

  @Column({ comment: '商品id' })
  good_id: number;

  @Column({ comment: '用户id' })
  user_id: number;

  @Column({ type: 'timestamp', nullable: true, comment: '支付时间' })
  payAt: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    comment: '发货时间',
    default: () => 'CURRENT_TIMESTAMP',
  })
  sendAt: Date;

  @Column({ type: 'timestamp', nullable: true, comment: '更新时间' })
  receiveAt: Date;

  @Column({ type: 'timestamp', nullable: true, comment: '预约时间' })
  appointAt: Date;

  @Column({ type: 'timestamp', nullable: true, comment: '退换/售后时间' })
  refundAt: Date;
}
