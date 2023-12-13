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
import { CommonResult } from '../util/commonResult';

@Controller('/api/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly dbService: DbService,
  ) {
    console.log(this);
  }

  @Get('/test')
  async test() {
    return await this.userService.test({});
  }

  @Post('/addOrUpdate')
  async addOrUpdate(@Body() body: UserAddDto) {
    return await this.userService.addOrUpdate(body);
  }

  @Post('/login')
  async login(@Body() body: UserLoginDto) {
    return await this.userService.login(body);
  }
}
