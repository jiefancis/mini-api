import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class GoodGroup extends BaseEntity {
  @Column({ comment: '分组id' })
  groupId: number;

  @Column({ comment: '商品id' })
  goodId: number;
}
