import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '优惠券名称' })
  name: string;

  @Column({ comment: '优惠券描述' })
  description: string;

  @Column({ comment: '是否删除 0 否 1 是', default: 0 })
  isDelete: boolean;

  @Column({
    comment: '优惠券状态 0 未使用 1 新到  2 快过期 3 已过期  4 已使用',
    default: 0,
  })
  status: number;

  @Column({ comment: '优惠券类型 0 满减券 1 折扣券 2 代金券', default: 0 })
  type: number;

  @Column({ comment: '优惠券金额' })
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
