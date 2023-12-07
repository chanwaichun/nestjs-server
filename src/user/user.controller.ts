import {
  Controller,
  Post,
  Body,
  Res,
  HttpException,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { UserService } from './user.service';
import { DbService } from '../db/db.service';
import { UserAddDto, UserLoginDto } from './dto/user.dto';
import { writeJson } from '../util';
import { Response } from 'express';

@Controller('/api/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly dbService: DbService,
  ) {
    console.log(this);
  }

  @Get('/test')
  async test(@Res() res: Response) {
    const result = await this.userService.test(res);
    writeJson(res, 200, { data: result });
  }

  @Post('/add')
  add(@Body() body: UserAddDto, @Res() res: Response) {
    try {
      this.userService.add(body);
      writeJson(res, 200, {});
    } catch (e) {
      throw new HttpException(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/login')
  async login(@Body() body: UserLoginDto, @Res() res: Response) {
    try {
      const token = await this.userService.login(body);
      if (!token) {
        writeJson(res, 500, { data: null, msg: '用户名或密码错误' });
        return;
      }
      writeJson(res, 200, { data: token });
    } catch (e) {
      console.log(e);
      throw new HttpException(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
