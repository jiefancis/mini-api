import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
@Entity()
export class Shop extends BaseEntity {
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 5000, nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  logo: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  contact_name: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  contact_phone: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
    comment: '店铺详细地址',
  })
  shop_address: string;

  @Column({ nullable: true, comment: '店铺经度' }) //type: 'long', length: 50,
  shop_lng: number;

  @Column({ nullable: true, comment: '店铺纬度' }) //type: 'long', length: 50,
  shop_lat: number;
}
