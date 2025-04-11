import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class UserLoginDto {
  @IsString()
  @Length(1, 50, { message: '用户名长度在1到50之间' })
  nickname: string; // 用户名

  @IsString()
  @Length(1, 50, { message: '密码长度在1到50之间' })
  @Matches(/^[a-zA-Z0-9_]+$/, { message: '密码由字母数字下划线组成' })
  password: string; // 密码
}

export class CreateUserDto extends UserLoginDto {
  @IsOptional()
  @IsString({ message: '头像是字符串' })
  avatar: string; // 头像

  @IsOptional()
  @IsNumber()
  gender: number; // 1 男 0 女

  @IsString()
  @IsPhoneNumber('CN', { message: '手机号格式不正确' })
  phone: string; // 手机号

  @IsOptional()
  @IsString()
  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string; // 邮箱

  @IsOptional()
  @IsBoolean()
  isDeleted: boolean; //是否注销 物理标记
}
