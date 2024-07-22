import { Injectable } from '@nestjs/common';
import { UserAddDto, UserLoginDto } from './dto/user.dto';
import { decodeToken, encodeToken } from 'src/util/token';
import ApiException from 'src/exception/apiException';
import { snowflake } from 'src/util';
import { CommonResult } from '../util/commonResult';
import { User } from 'src/dao/user';
import sequelize from 'src/util/sequelize';
import { Op } from 'sequelize';
import { commonPage } from '../util/commonPage';
import { join } from 'path';
import { createWriteStream, existsSync } from 'fs';
import * as path from 'path';

const user = User.initModel(sequelize);

@Injectable()
export class UserService {
  constructor() {}

  // 上传
  async upload(file: any) {
    const publicPath = path.join(__dirname, '../..', 'public/');
    console.log(publicPath, __dirname);
    const fileName = Buffer.from(file.originalname, 'latin1').toString('utf-8');
    if (!existsSync(path.join(publicPath, fileName))) {
      const writeStream = createWriteStream(
        join(__dirname, '../..', 'public/' + fileName),
        {},
      );

      writeStream.write(file.buffer);
    }

    return CommonResult.success('', '/static/' + fileName);
  }

  // 获取用户信息
  async getUserInfo(id: string, authorization: string) {
    const res: any = await decodeToken(authorization);
    console.log(new Date(res.expiredAt).getTime());
    const userId = id || res.userId;
    if (!userId) {
      throw new ApiException('缺少userId');
    }
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

  async test() {
    const result = await user.findAll();
    return CommonResult.success('', result);
  }

  // 删除用户
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
      const plain = await result.get({ plain: true });
      console.log(plain);
      return CommonResult.success(null, encodeToken(plain));
    } else {
      throw new ApiException('账号或密码不正确');
    }
  }
}
