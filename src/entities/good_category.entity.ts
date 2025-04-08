import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class GoodCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '类别名称',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '类别名称',
  })
  icon: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  //   @Column()
  //   sort: number;

  //   @Column()
  //   is_show: number;

  //   @Column()
  //   is_delete: number;

  //   @Column()
  //   create_time: Date;

  //   @Column()
  //   update_time: Date;

  //   @Column()
  //   create_user: number;

  //   @Column()
  //   update_user: number;

  //   @Column()
  //   is_hot: number;
}
