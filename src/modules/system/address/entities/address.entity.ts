import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/entities/base.entity';
@Entity()
export class Address extends BaseEntity {
  @Column({ type: 'varchar', length: 50, comment: '收货人姓名' })
  name: string;

  @Column({ type: 'varchar', length: 50, comment: '收货人电话' })
  phone: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, comment: '收货地址纬度' })
  lng: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, comment: '收货地址经度' })
  lat: number;

  @Column({ type: 'varchar', length: 255, comment: '收货地址名称' })
  address_name: string;

  @Column({ type: 'varchar', length: 255, comment: '收货地址详细' })
  address_detail: string;

  @Column({ type: 'int', comment: '地址所属人' })
  user_id: number;

  @Column({ type: 'int', default: 0, comment: '是否默认地址' })
  default: number; // 1 是 0 否
}
