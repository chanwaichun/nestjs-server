import {
  Body,
  Controller,
  Get,
  Header,
  Headers,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserAddDto, UserLoginDto } from './dto/user.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserAttributes, UserPk } from '../dao/User';

type Pagination<T> = T & {
  pageSize: number;
  pageNum: number;
  total: number;
};
type UserIdOnly = Pick<UserAttributes, UserPk>;

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
  constructor(private readonly userService: UserService) {}

  @Post('/upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        userId: {
          type: 'string',
          format: 'string',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @Header('Content-Type', 'application/json')
  async upload(@UploadedFile() file: any, @Body() body: UserIdOnly) {
    const userImg = await this.userService.upload(file);
    return await this.userService.updateTarget(body.userId, { userImg });
  }

  @Get('/test')
  async test() {
    return await this.userService.test();
  }

  @Get('/delete')
  async delete(@Query() query: UserIdOnly) {
    return await this.userService.delete(query.userId);
  }

  @Get('/info')
  async getUserInfo(@Query() query: UserAddDto, @Headers() headers: any) {
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

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userName: {
          type: 'string',
          example: '13412331232',
          description: '用户名',
        },
        password: {
          type: 'string',
          example: '111111',
          description: '密码',
        },
      },
    },
  })
  @Post('/login')
  async login(@Body() body: UserLoginDto) {
    return await this.userService.login(body);
  }
}
