import { HttpStatus, Injectable } from '@nestjs/common';
import { UserAddDto, UserLoginDto } from './dto/user.dto';
import { encodeToken } from '../util/token';
import { DbService } from '../db/db.service';
import ApiException from '../exception/apiException';
import { snowflake, writeInsertSql, writeUpdateSql } from '../util';
import { CommonResult } from '../util/commonResult';
import { User } from 'src/dao/user';
import sequelize from 'src/util/sequelize';
import { Op } from 'sequelize';

const user = User.initModel(sequelize);

@Injectable()
export class UserService {
  constructor(private readonly dbService: DbService) {}

  async test(body: any) {
    const result = await user.findAll();
    return CommonResult.success('', result);
  }

  // 注册
  async addOrUpdate(body: UserAddDto) {
    const {
      userId = null,
      userName = null,
      phone = null,
      password = null,
      roleId = null,
      userImg = null,
    }: any = body;
    if (!phone) {
      throw new ApiException('请输入手机号码');
    }
    if (!userName) {
      throw new ApiException('请输入用户名称');
    }
    if (!password) {
      throw new ApiException('请输入密码');
    }
    if (userId) {
      await user.update(
        {
          userName,
          phone,
          password,
          roleId,
          userImg,
        },
        { where: { userId } },
      );
    } else {
      await user.upsert({
        userId: snowflake.generate(),
        userName,
        phone,
        password,
        roleId,
        userImg,
      });
    }
    // console.log(result);
    return CommonResult.success();
  }

  async login(body: UserLoginDto) {
    const { userName = '', password = '' } = body;
    const result = await user.findOne({
      where: {
        [Op.or]: [
          { userName, password },
          {
            phone: userName,
            password,
          },
        ],
      },
    });
    console.log(encodeToken(result.get({ plain: true })));
    if (result) {
      return CommonResult.success(
        null,
        encodeToken(result.get({ plain: true })),
      );
    } else {
      throw new ApiException('账号或密码不正确');
    }
  }
}
