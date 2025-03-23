import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import {
  Model,
  Column,
  CreatedAt,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'users',
  timestamps: true, // ✅ 开启 Sequelize 时间戳管理
})
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
  deviceId: string;

  @CreatedAt
  @Column({ field: 'create_time' }) // 自定义字段名
  createTime: Date;

  @UpdatedAt
  @Column({ field: 'update_time' }) // 自定义字段名
  updateTime: Date;
}
