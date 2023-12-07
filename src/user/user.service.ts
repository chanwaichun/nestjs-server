import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserAddDto, UserLoginDto } from './dto/user.dto';
import { encodeToken } from '../util/token';
import { DbService } from '../db/db.service';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DbService) {}

  async test(body: any) {
    const [result] = await this.dbService.sequelize.query(
      'SELECT userId,phone,userName FROM user ',
    );
    return result;
  }

  add(body: UserAddDto) {
    console.log(body);
    if (body.userId) {
      console.log('更新');
    } else {
      console.log('新增');
    }
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
