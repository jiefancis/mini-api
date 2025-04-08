import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Collection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '用户id' })
  user_id: number;

  @Column({ comment: '商品id' })
  good_id: number;

  @Column({ comment: '是否删除' })
  isDelete: boolean;

  @Column({ comment: '状态 0 未收藏 1 已收藏' })
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
