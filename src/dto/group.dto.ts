import { IsNumber, IsOptional, IsString } from 'class-validator';

// 分页参数
export class GroupCreateDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsString({ message: '分组名不能为空' })
  name: string;
}
