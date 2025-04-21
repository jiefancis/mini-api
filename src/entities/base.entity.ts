import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
// import * as dayjs from 'dayjs';
// import * as utc from 'dayjs/plugin/utc'; // ES 2015
// // // 注册 utc 插件，因为 dayjs 默认不包含 utc 功能，需要手动引入
// dayjs.extend(utc);
// import * as dayjs from 'dayjs';
// import * as isLeapYear from 'dayjs/plugin/isLeapYear'; // 导入插件
// import 'dayjs/locale/zh-cn'; // 导入本地化语言

// dayjs.extend(isLeapYear); // 使用插件
// dayjs.locale('zh-cn'); // 使用本地化语言

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', comment: '是否删除', default: false })
  isDeleted: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建时间',
    nullable: true,

    // transformer: {
    //   to(value: Date): Date {
    //     return dayjs(value).utcOffset(8).toDate();
    //     // return moment(value).utcOffset(8).toDate(); // 写入时转为 UTC+8
    //   },
    //   from(value: Date): Date {
    //     return dayjs(value).utcOffset(8).toDate();
    //     // return moment(value).utcOffset(8).toDate(); // 读取时转为 UTC+8
    //   },
    // },
  })
  createdAt: Date;

  @UpdateDateColumn({
    nullable: true,
    type: 'timestamp',
    comment: '更新时间',
  })
  updatedAt: Date;
}
