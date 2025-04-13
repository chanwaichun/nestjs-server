import { Body, Controller, Header, Post, Res, Req } from '@nestjs/common';
import { ZitieService } from './zitie.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ThirdPartyService } from '../thirdParty/thirdParty.service';
import { AddMessageDto } from './dto/zitie.dto';

@ApiTags('字帖')
@Controller('/api/zitie')
export class ZitieController {
  constructor(
    private readonly zitieService: ZitieService,
    private readonly thirdPartyService: ThirdPartyService,
  ) {}

  @ApiOperation({ tags: ['字帖'], description: '字帖列表' })
  @Post('/getZitieByLevel')
  getZitieByClass(@Body() body: any, @Res() res: any) {
    const { level } = body;
    const params = {
      messages: [
        {
          role: 'system',
          content: '你是一个有经验的语文老师',
        },
        {
          role: 'user',
          content: `请根据用户的要求，生成一个${1}年级的古诗。`,
        },
      ],
    };
    return this.thirdPartyService.chatMessage(params, res); // 添加两个空字符串参数以满足方法签名要求
  }

  @ApiOperation({ tags: ['字帖'], description: '开始一个对话' })
  @Post('/startConversation')
  startConversation(@Body() body: any) {
    return this.zitieService.startConversation(body);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        content: {
          type: 'string',
          example: 'test',
          description: '对话内容',
        },
        deviceId: {
          type: 'string',
          example: '222222222222',
          description: '设备ID',
        },
      },
    },
  })
  @ApiOperation({ tags: ['字帖'], description: '开始发一条消息' })
  @Post('/addMessage')
  async addMessage(@Body() body: AddMessageDto) {
    return this.zitieService.addMessage(body);
  }

  @ApiOperation({ tags: ['字帖'], description: '删除一条消息' })
  @Post('/deleteMessage')
  deleteMessage() {
    return this.zitieService.deleteMessage();
  }
}
