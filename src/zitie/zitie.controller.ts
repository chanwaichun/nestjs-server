import { Body, Controller, Post, Res } from '@nestjs/common';
import { ZitieService } from './zitie.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ThirdPartyService } from '../thirdParty/thirdParty.service';

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
}
