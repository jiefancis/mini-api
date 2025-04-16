import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
@Entity()
export class Collection extends BaseEntity {
  @Column({ comment: '用户id' })
  user_id: number;

  @Column({ comment: '商品id' })
  good_id: number;

  @Column({ comment: '状态 0 未收藏 1 已收藏' })
  status: number;
}
