import { Injectable } from '@nestjs/common';
import { NoticeGateway } from './notice.gateway';

@Injectable()
export class NoticeService {
  public noticeGateWay: NoticeGateway;

  constructor(noticeGateWay: NoticeGateway) {
    this.noticeGateWay = noticeGateWay;
  }

  sendMessageToClient(msg: string) {
    return this.noticeGateWay.sendMessageToClient(msg);
  }
}
