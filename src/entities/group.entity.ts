import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('group')
export class Group extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '分组名称',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '分组icon',
  })
  icon: string;
}
