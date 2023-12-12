import { HttpStatus, Injectable } from '@nestjs/common';
import { UserAddDto, UserLoginDto, UserRegister } from './dto/user.dto';
import { encodeToken } from '../util/token';
import { DbService } from '../db/db.service';
import ApiException from '../exception/apiException';
import { snowflake, writeInsertSql } from '../util';
import { CommonResult } from '../util/commonResult';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DbService) {}

  async test(body: any) {
    /*const [result] = await this.dbService.sequelize.query(
      'SELECT userId,phone,userName FROM user ',
    );
    return result;*/
    throw new ApiException();
  }

  add(body: UserAddDto) {
    console.log(body);
    if (body.userId) {
      console.log('更新');
    } else {
      console.log('新增');
    }
  }
  // 注册
  async register(body: UserRegister) {
    const {
      userName = null,
      phone = null,
      password = null,
      roleId = null,
      userImg = null,
    } = body;
    if (!phone) {
      throw new ApiException('请输入手机号码');
    }
    if (!userName) {
      throw new ApiException('请输入用户名称');
    }
    if (!password) {
      throw new ApiException('请输入密码');
    }
    const { key, value, replacements } = writeInsertSql({
      userId: snowflake.generate(),
      userName,
      phone,
      password,
      roleId,
      userImg,
    });
    const [result] = await this.dbService.sequelize.query(
      `INSERT INTO user ${key} VALUES ${value}`,
      {
        replacements,
      },
    );
    console.log(result);
    return CommonResult.success('', '');
    // if (body.userId) {
    //   console.log('更新');
    // } else {
    //   console.log('新增');
    // }
  }

  async login(body: UserLoginDto) {
    const { userName = '', password = '' } = body;
    const [result] = await this.dbService.sequelize.query(
      'SELECT * FROM user WHERE (userName = ? AND password = ?) OR (phone = ? AND password = ?) ',
      {
        replacements: [userName, password, userName, password],
      },
    );
    console.log(result);
    if (result.length === 1) {
      return encodeToken(result[0]);
    } else {
      return '';
    }
  }
}
