import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface AiChatConversationsAttributes {
  id: string;
  userId?: string;
  deviceId: string;
  title?: string;
  systemPrompt?: string;
  model?: string;
  createdTime?: Date;
  updatedTime?: Date;
}

export type AiChatConversationsPk = "id";
export type AiChatConversationsId = AiChatConversations[AiChatConversationsPk];
export type AiChatConversationsOptionalAttributes = "userId" | "title" | "systemPrompt" | "model" | "createdTime" | "updatedTime";
export type AiChatConversationsCreationAttributes = Optional<AiChatConversationsAttributes, AiChatConversationsOptionalAttributes>;

export class AiChatConversations extends Model<AiChatConversationsAttributes, AiChatConversationsCreationAttributes> implements AiChatConversationsAttributes {
  id!: string;
  userId?: string;
  deviceId!: string;
  title?: string;
  systemPrompt?: string;
  model?: string;
  createdTime?: Date;
  updatedTime?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof AiChatConversations {
    return AiChatConversations.init({
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
      comment: "UUID 会话ID"
    },
    userId: {
      type: DataTypes.CHAR(36),
      allowNull: true,
      comment: "用户UUID",
      field: 'user_id'
    },
    deviceId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      comment: "用户UUID",
      field: 'device_id'
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "会话标题"
    },
    systemPrompt: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "初始系统提示词",
      field: 'system_prompt'
    },
    model: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "gpt-4",
      comment: "默认AI模型"
    },
    createdTime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'created_time'
    },
    updatedTime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'updated_time'
    }
  }, {
    sequelize,
    tableName: 'ai_chat_conversations',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
