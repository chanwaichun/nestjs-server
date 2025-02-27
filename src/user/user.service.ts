import { Injectable } from '@nestjs/common';
import { UserAddDto, UserLoginDto } from './dto/user.dto';
import { decodeToken, encodeToken } from 'src/util/token';
import { FailException } from 'src/exception/apiException';
import { getSnowflakeId, getTime } from 'src/util';
import { CommonResult } from '../util/commonResult';
import { User, UserAttributes, UserPk } from 'src/dao/User';
import sequelize from 'src/util/sequelize';
import { Op } from 'sequelize';
import { commonPage } from '../util/commonPage';
import * as path from 'path';
import { createWriteStream, existsSync } from 'fs';
import { NoticeService } from '../notice/notice.service';

@Injectable()
export class UserService {
  public user;
  public noticeService;

  constructor(noticeService: NoticeService) {
    this.user = User.initModel(sequelize);
    this.noticeService = noticeService;
  }

  // 上传
  async upload(file: any) {
    try {
      const publicPath = path.join(__dirname, '../..', 'public/');
      // 拿buffer里面的originalName
      const fileName = Buffer.from(file.originalname, 'latin1').toString(
        'utf-8',
      );
      if (!existsSync(path.join(publicPath, fileName))) {
        // 创造一个读写流
        const writeStream = createWriteStream(
          path.join(__dirname, '../..', 'public/' + fileName),
          {},
        );
        // 把buffer写进去
        writeStream.write(file.buffer);
      }
      return '/static/' + fileName;
    } catch (e) {
      throw new FailException('上传失败');
    }
  }

  /**
   *
   * @param id
   * @param authorization
   */
  async getUserInfo(id: string, authorization: string) {
    const res: any = await decodeToken(authorization);
    const userId = id || res.userId;
    if (!userId) {
      throw new FailException('缺少userId');
    }
    const result: Partial<UserAttributes> = await this.user.findOne({
      attributes: {
        exclude: ['password'],
      },
      where: {
        userId,
      },
    });
    if (!result) {
      throw new FailException('用户不存在,请联系管理员');
    }

    return CommonResult.success<Partial<UserAttributes>>(result);
  }

  async test() {
    const result = await this.user.findAll();
    return CommonResult.success(result);
  }

  // 删除用户
  async delete(userId: string) {
    // 查找用户是否存在
    const userOne = await this.user.findOne({
      where: {
        userId,
      },
    });
    if (!userOne) {
      throw new FailException('暂无该用户');
    }
    await this.user.destroy({
      where: {
        userId,
      },
    });
    return CommonResult.success();
  }

  /**
   * 获取角色列表
   */
  getRoleList() {
    return CommonResult.success([
      { key: '1', value: '管理员' },
      { key: '2', value: '用户' },
    ]);
  }

  /**
   * 获取用户列表
   * @param query
   */
  async getUserList(query) {
    const { pageSize, pageNum } = query;
    const result = await commonPage<any>(
      this.user,
      { pageNum, pageSize },
      {
        attributes: {
          exclude: ['password'],
        },
      },
    );
    return CommonResult.success(result);
  }

  async updateTarget(
    userId: string,
    userAttr: Partial<Omit<UserAttributes, UserPk>>,
  ) {
    const result = await this.user.update(
      { ...userAttr },
      {
        where: {
          userId,
        },
      },
    );
    console.log(result);
    return CommonResult.success();
  }

  async register(body: UserAddDto) {
    const {
      userName = null,
      phone = null,
      password = null,
      roleId = null,
      userImg = null,
    }: any = body;
    await this.user.upsert({
      userId: getSnowflakeId(),
      userName,
      phone,
      password,
      roleId,
      userImg,
      createTime: getTime(),
      updateTime: getTime(),
    });
    return CommonResult.success();
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
    }: UserAddDto = body;
    if (!phone) {
      throw new FailException('请输入手机号码');
    }
    if (!userName) {
      throw new FailException('请输入用户名称');
    }
    if (!password) {
      throw new FailException('请输入密码');
    }
    if (userId) {
      await this.user.update(
        {
          userName,
          phone,
          password,
          roleId,
          userImg,
          updateTime: getTime(),
        },
        { where: { userId } },
      );
    } else {
      await this.user.upsert({
        userId: getSnowflakeId(),
        userName,
        phone,
        password,
        roleId,
        userImg,
        createTime: getTime(),
        updateTime: getTime(),
      });
    }
    // console.log(result);
    return CommonResult.success();
  }

  async login(body: UserLoginDto): Promise<CommonResult<string>> {
    const { userName = '', password = '' } = body;
    const result = await this.user.findOne({
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
      // this.noticeService.sendMessageToClient('成功登录');
      return CommonResult.success(encodeToken(plain));
    } else {
      throw new FailException('账号或密码不正确');
    }
  }
}
