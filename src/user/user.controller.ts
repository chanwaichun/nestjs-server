import {
  Controller,
  Post,
  Body,
  Get,
  Headers,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserAddDto, UserLoginDto } from './dto/user.dto';
import { ApiHeader, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import fs from 'fs';
import { FileInterceptor } from '@nestjs/platform-express';

type Pagination<T> = T & {
  pageSize: number;
  pageNum: number;
  total: number;
};

@ApiHeader({
  name: 'Authorization',
  description: 'token',
  required: false,
  schema: {
    type: 'string',
    example: null,
    default: '',
  },
})
@ApiTags('用户管理')
@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {
    console.log(this);
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: any) {
    console.log(file);

    // const file = req.formData;
    // fs.writeFileSync('./static/' + file.name, file.type);
    return await this.userService.upload(file);
  }

  @Get('/test')
  async test() {
    return await this.userService.test();
  }

  @Get('/delete')
  async delete(@Query() query: UserAddDto) {
    console.log(query);
    return await this.userService.delete(query.userId);
  }

  @Get('/info')
  async getUserInfo(@Query() query: UserAddDto, @Headers() headers: any) {
    console.log(headers);
    return await this.userService.getUserInfo(
      query.userId,
      headers.authorization,
    );
  }

  @Get('/get/role/list')
  getRoleList() {
    return this.userService.getRoleList();
  }

  @Post('/addOrUpdate')
  async addOrUpdate(@Body() body: UserAddDto) {
    return await this.userService.addOrUpdate(body);
  }

  @ApiQuery({ name: 'pageSize', type: String, description: '页数' })
  @ApiQuery({
    name: 'pageNum',
    type: String,
    description: '页码',
  })
  @Get('/get/list')
  async getUserList(@Query() query: Pagination<UserLoginDto>) {
    return await this.userService.getUserList(query);
  }

  @ApiParam({
    name: 'userName',
    type: String,
    description: '用户名或者手机号码',
  })
  @ApiParam({ name: 'password', type: String, description: '密码' })
  @Post('/login')
  async login(@Body() body: UserLoginDto) {
    return await this.userService.login(body);
  }
}
