import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nickname: string; // 昵称

  @Column()
  password: string; // 密码

  @Column({ nullable: true })
  avatar: string; // 头像

  @Column({ default: 1, comment: '1 男 0 女' })
  gender: number; // 1 男 0 女

  @Column()
  phone: string; // 手机号

  @Column({ nullable: true })
  email: string; // 邮箱

  @Column({ default: false })
  isDeleted: boolean; //是否注销 物理标记

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
