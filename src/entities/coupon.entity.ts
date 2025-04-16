import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
@Entity()
export class Coupon extends BaseEntity {
  @Column({ comment: '优惠券名称' })
  name: string;

  @Column({ comment: '优惠券描述' })
  description: string;

  @Column({
    comment: '优惠券状态 0 未使用 1 新到  2 快过期 3 已过期  4 已使用',
    default: 0,
  })
  status: number;

  @Column({ comment: '优惠券类型 0 满减券 1 折扣券 2 代金券', default: 0 })
  type: number;

  @Column({ comment: '优惠券金额' })
  amount: number;
}
