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
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserAddDto, UserLoginDto } from './dto/user.dto';
import { ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger';

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

  @Get('/test')
  async test() {
    return await this.userService.test({});
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
