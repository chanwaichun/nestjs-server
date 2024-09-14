import { Module } from '@nestjs/common';
import { NoticeGateway } from './notice.gateway';
import { NoticeService } from './notice.service';

@Module({
  providers: [NoticeGateway, NoticeService],
  exports: [NoticeService, NoticeGateway],
})
export class NoticeModule {}
