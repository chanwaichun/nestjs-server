import { Body, Controller, Post, Res } from '@nestjs/common';
import { ThirdPartyService } from './thirdParty.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('ai地')
@ApiBearerAuth()
@Controller('/api/thirdParty')
export class ThirdPartyController {
  constructor(private readonly thirdPartyService: ThirdPartyService) {
  }

  @ApiOperation({ tags: ['ai调用'], description: 'ai调用' })
  @Post('/chatMessage')
  chat(@Body() body: any, @Res() res: any) {
    return this.thirdPartyService.chatMessage(body, res);
  }
}
