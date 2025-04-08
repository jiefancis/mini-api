import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

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
}
