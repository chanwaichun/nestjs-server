import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    description: '用户Id',
  })
  userId: string;
  userName: string;
  phone: string;
  password: string;
  roleId: string;
  userImg: string;
}
