import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

interface IServices {
  name?: string;
  desc?: string;
}

@Entity()
export class Good {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '商品名称',
  })
  name: string;

  @Column({ type: 'float', comment: '商品价格', default: 0.0 })
  price: number;

  @Column({ type: 'float', comment: '商品原价', default: 0.0 })
  origin_price: number;

  @Column({ type: 'int', comment: '销量', default: 0 })
  sales: number;

  @Column({
    type: 'json',
    comment: '商品标签',
    // default: '[]', // []也不行
  })
  tags: Array<string>;

  // {
  //   type: 'int',
  //   // comment: '商品状态:1-上架,2-下架,3-售罄',
  // //   // default: 1,
  // // }
  @Column({
    type: 'int',
    nullable: true,
    comment: '商品状态:1-上架,2-下架,3-售罄',
    default: 1,
  })
  status: number;

  // // {
  // //   type: 'json',
  // //   nullable: true,
  // //   // comment: '商品服务说明',
  // //   // default: [],
  // // }
  @Column({ type: 'json', nullable: true })
  services: Array<IServices>; //Array<{ title?: string; content?: string }>;

  @Column({
    type: 'json',
    comment: '商品轮播图',
    // default: [],
  })
  carousel_pics: Array<{ src: string; url: string }>;

  @Column({
    type: 'json',
    nullable: true,
    comment: '商品图片',
    // default: [],
  })
  pictures: Array<string>;

  @Column({
    type: 'varchar',
    length: 2000,
    comment: '商品使用规则',
  })
  good_rule: string;

  @Column({
    type: 'timestamp',
    comment: '有效期开始时间',
    // default: () => 'CURRENT_DATE',
  })
  validity_start: Date;

  @Column({
    type: 'timestamp',
    comment: '有效期结束时间',
    // default: () => 'CURRENT_DATE',
  })
  validity_end: Date;

  // // 修正为datetime类型
  @Column({
    type: 'varchar',
    length: 3000,
    comment: '商品特殊时段',
    // default: () => 'CURRENT_DATE',
  })
  special_time: string;

  // // 修正类型为int
  @Column({
    type: 'int',

    comment: '商品库存',
    default: 0,
  })
  stock: number;

  @Column({ type: 'int', nullable: true, comment: '所属店铺id' })
  shop_id: number;

  @Column({
    type: 'json',
    nullable: true,
    comment: '商品分类id',
    // default: [],
  })
  good_category_ids: Array<number | string>;

  @Column({
    type: 'json',
    nullable: true,
    comment: '商品分类id',
    // default: [],
  })
  good_group_ids: Array<number | string>;

  @Column({
    type: 'json',
    nullable: true,
    comment: '商品套餐内容',
    // default: [],
    // default: '[]',
  })
  package_content: Array<{ price: number; name: string; count: number }>;

  // @CreateDateColumn({ type: 'timestamp', nullable: true, comment: '创建时间' })
  // createdAt: Date;

  // @UpdateDateColumn({ type: 'timestamp', nullable: true, comment: '更新时间' })
  // updatedAt: Date;

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
