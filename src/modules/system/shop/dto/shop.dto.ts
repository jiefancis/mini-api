import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

export class ShopCreateDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsString({ message: '店铺名称不能为空' })
  @Length(1, 50, { message: '店铺名称长度在1-50之间' })
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  logo: string;

  @IsString({ message: '联系人姓名不能为空' })
  @Length(1, 50, { message: '联系人姓名长度在1-50之间' })
  contact_name: string;

  @IsString({ message: '联系人电话不能为空' })
  @IsPhoneNumber('CN', { message: '联系人电话格式不正确' })
  contact_phone: string;

  @IsString({ message: '店铺详细地址不能为空' })
  @Length(1, 500, { message: '店铺详细地址长度在1-500之间' })
  shop_address: string;

  @IsNumber()
  @IsNotEmpty({ message: '店铺经度不能为空' })
  shop_lng: number;

  @IsNumber()
  @IsNotEmpty({ message: '店铺纬度不能为空' })
  shop_lat: number;
}
