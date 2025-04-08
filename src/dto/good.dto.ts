import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsInt,
} from 'class-validator';

class GoodServiceDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;
}

class CarouselPicDto {
  @IsString()
  src: string;

  @IsOptional()
  @IsString()
  url: string;
}

class PackageContentDto {
  @IsNumber()
  price: number;

  @IsString()
  name: string;

  @IsInt()
  count: number;
}

export class GoodCreateDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  origin_price: number;

  @IsNumber()
  sales: number;

  @IsArray({ message: 'tags 必须是数组' })
  @IsString({ each: true })
  tags: string[]; // 前端传递时需是 JSON 字符串形式

  @IsNumber()
  @IsOptional()
  status: number;

  // @IsJSON()
  // @IsOptional()
  @IsArray({ message: 'services 必须是数组' })
  @ValidateNested({ each: true, message: 'services nested' })
  @Type(() => GoodServiceDto)
  services: GoodServiceDto[];

  @IsArray({ message: 'carousel_pics 必须是数组' })
  @ValidateNested({ each: true, message: 'carousel_pics nested' })
  @Type(() => CarouselPicDto)
  carousel_pics: CarouselPicDto[];

  @IsArray({ message: 'pictures 必须是数组' })
  @IsOptional()
  pictures?: Array<string>;

  @IsString()
  good_rule: string;

  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'validity_start 必须是时间戳' })
  validity_start: Date;

  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'validity_end 必须是时间戳' })
  validity_end: Date;

  @IsString()
  special_time: string;

  @IsNumber()
  stock: number;

  @IsNumber()
  @IsOptional()
  shop_id: number;

  // @IsJSON()
  // @IsOptional()
  @IsArray({ message: 'good_category_ids 必须是数组' })
  @IsNumber({}, { each: true })
  good_category_ids: Array<number>; // 前端传递时需是 JSON 字符串形式

  // @IsJSON()
  // @IsOptional()
  @IsArray({ message: 'good_group_ids 必须是数组' })
  @IsNumber({}, { each: true, message: 'good_group_ids IsNumber' })
  good_group_ids: Array<number>; // 前端传递时需是 JSON 字符串形式

  // @IsJSON()
  @IsArray({ message: 'package_content 必须是数组' })
  @ValidateNested({ each: true, message: 'package_content nested' })
  @Type(() => PackageContentDto)
  package_content: Array<PackageContentDto>; // 前端传递时需是 JSON 字符串形式
}
