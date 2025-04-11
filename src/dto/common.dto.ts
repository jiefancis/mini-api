import { IsArray, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

// 分页参数
export class ListPageDto {
  /**
   * 当前页
   */
  @IsNumber({}, { message: '当前页必须为整数' })
  pageNo: number;
  /**
   * 每页条数
   */
  @IsNumber({}, { message: '每页条数必须为整数' })
  pageSize: number;

  /**
   * 排序字段
   */
  @IsOptional()
  @IsString({ message: '排序字段必须为字符串' })
  sort?: string;
  /**
   * 排序方式
   */
  @IsOptional()
  @IsIn(['asc', 'desc'], { message: '排序方式必须为 asc 或 desc' })
  order?: string;

  // 关键字搜索
  @IsOptional()
  @IsString({ message: '搜索关键字必须为字符串' })
  search: string;

  // 价格区间
  @IsOptional()
  @IsArray({ message: '价格区间必须为数组' })
  @IsNumber({}, { each: true, message: '价格必须为数字' })
  priceRange: Array<number>;

  // 类别ids
  @IsOptional()
  @IsArray({ message: '类别必须为数组' })
  @IsNumber({}, { each: true, message: '类别必须为数字' })
  categoryIds: Array<number>;

  // 分组ids
  @IsOptional()
  @IsArray({ message: '分组必须为数组' })
  @IsNumber({}, { each: true, message: '分组必须为数字' })
  groupIds: Array<number>;
}
