import { Injectable } from '@nestjs/common';
import sequelize from 'src/util/sequelize';
import { AiChatMessages } from 'src/dao/AiChatMessages';
import {
  AiChatConversationsAttributes,
  AiChatConversations,
} from 'src/dao/AiChatConversations';
import { uuid } from 'uuidv4';
import { AiChatConversationsModel } from 'src/model/ai/chatConversations';
import { AiChatMessagesModel } from 'src/model/ai/chatMessages';
import { CommonResult } from '../util/commonResult';
import { AddMessageDto } from './dto/zitie.dto';
import { ThirdPartyService } from '../thirdParty/thirdParty.service';
import { Op } from 'sequelize';

@Injectable()
export class ZitieService {
  private AiChatConversationsModel: typeof AiChatConversations;
  private AiChatMessagesModel: typeof AiChatMessages;
  private thirdPartyService: ThirdPartyService;

  constructor(thirdPartyService: ThirdPartyService) {
    this.thirdPartyService = thirdPartyService;
    this.AiChatConversationsModel =
      AiChatConversationsModel.initModel(sequelize);
    this.AiChatMessagesModel = AiChatMessagesModel.initModel(sequelize);
  }

  // 开始一个对话
  async startConversation(body: AiChatConversationsAttributes) {
    await this.AiChatConversationsModel.upsert({
      id: uuid(),
      ...body,
    });
    return CommonResult.success();
  }

  //
  async addMessage(body: AddMessageDto) {
    console.log(body);
    await this.AiChatMessagesModel.create({
      id: uuid(),
      ...body,
    });
    const { userId, deviceId } = body;
    const historyData = await this.AiChatMessagesModel.findAll({
      where: {
        [Op.and]: { userId, deviceId },
      },
      order: [['createdTime', 'ASC']],
    });
    const messages = historyData.map(({ content, role }) => {
      return {
        content,
        role,
      };
    });
    console.log(historyData);
    return CommonResult.success(messages);
  }

  async deleteMessage() {
    await this.AiChatMessagesModel.destroy({
      where: {
        deviceId: null,
      },
    });
  }
}
