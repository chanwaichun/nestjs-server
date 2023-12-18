import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class User {
  @ApiProperty({
    description: '用户Id',
  })
  userId: string;

  @ApiProperty({
    description: '用户名称',
  })
  @IsNotEmpty({
    message: '请输入用户名称',
  })
  userName: string;

  @ApiProperty({
    description: '手机号码',
  })
  phone: string;

  @IsNotEmpty({
    message: '请输入密码',
  })
  @ApiProperty({
    description: '用户密码',
  })
  password: string;

  roleId: string;
  userImg: string;
}
