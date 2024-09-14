import { Injectable } from '@nestjs/common';
import { NoticeGateway } from './notice.gateway';

@Injectable()
export class NoticeService {
  constructor(private readonly noticeGateWay: NoticeGateway) {
    console.log(this.noticeGateWay);
  }

  sendMessageToClient(msg: string) {
    return this.noticeGateWay.sendMessageToClient(msg);
  }
}
