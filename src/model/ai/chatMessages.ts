import { Sequelize } from 'sequelize';
import { AiChatMessages as BaseModel } from 'src/dao/AiChatMessages';
export class AiChatMessagesModel extends BaseModel {
  static initWithExtensions(sequelize: Sequelize): typeof BaseModel {
    // 复用原始字段定义（通过 super.initModel 调用）
    const model = super.initModel(sequelize);
    // 注入额外配置（Sequelize 不限制你再次 patch options）
    model.options.tableName = 'ai_chat_messages';
    model.options.timestamps = true;
    model.options.createdAt = 'create_time';
    model.options.updatedAt = 'update_time';
    model.options.underscored = true;
    model.options.comment = 'AI 对话主表';

    return model;
  }
}
