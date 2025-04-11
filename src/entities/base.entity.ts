import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', comment: '是否删除' })
  isDeleted: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建时间',
    nullable: true,
  })
  createdAt: Date;

  @UpdateDateColumn({
    nullable: true,
    type: 'timestamp',
    comment: '更新时间',
  })
  updatedAt: Date;
}
