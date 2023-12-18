import { Injectable } from '@nestjs/common';
import { UserAddDto, UserLoginDto } from './dto/user.dto';
import { encodeToken } from 'src/util/token';
import ApiException from 'src/exception/apiException';
import { snowflake } from 'src/util';
import { CommonResult } from '../util/commonResult';
import { User } from 'src/dao/user';
import sequelize from 'src/util/sequelize';
import { Op } from 'sequelize';
import { commonPage } from '../util/commonPage';

const user = User.initModel(sequelize);

@Injectable()
export class UserService {
  async;

  constructor() {}

  async getUserInfo(userId: string) {
    const result = await user.findOne({
      attributes: {
        exclude: ['password'],
      },
      where: {
        userId,
      },
    });
    if (!result) {
      throw new ApiException('用户不存在,请联系管理员');
    }

    return CommonResult.success('', result);
  }

  async test(body: any) {
    const result = await user.findAll();
    return CommonResult.success('', result);
  }

  async delete(userId: string) {
    // 查找用户是否存在
    const userOne = await user.findOne({
      where: {
        userId,
      },
    });
    console.log(userOne);
    if (!userOne) {
      throw new ApiException('暂无该用户');
    }
    await user.destroy({
      where: {
        userId,
      },
    });
    return CommonResult.success();
  }

  getRoleList() {
    return CommonResult.success('', [
      { key: '1', value: '管理员' },
      { key: '2', value: '用户' },
    ]);
  }

  async getUserList(query) {
    const { pageSize, pageNum } = query;
    console.log(pageSize, pageNum);
    const result = await commonPage<any>(
      user,
      { pageNum, pageSize },
      {
        attributes: {
          exclude: ['password'],
        },
      },
    );
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

  async login(body: UserLoginDto): Promise<CommonResult<UserLoginDto>> {
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
