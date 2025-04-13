import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface AiChatMessagesAttributes {
  id: string;
  deviceId: string;
  userId?: string;
  content?: string;
  functionName?: string;
  functionArguments?: object;
  model?: string;
  role: string;
  tokens?: number;
  createdTime?: Date;
}

export type AiChatMessagesPk = "id";
export type AiChatMessagesId = AiChatMessages[AiChatMessagesPk];
export type AiChatMessagesOptionalAttributes = "userId" | "content" | "functionName" | "functionArguments" | "model" | "tokens" | "createdTime";
export type AiChatMessagesCreationAttributes = Optional<AiChatMessagesAttributes, AiChatMessagesOptionalAttributes>;

export class AiChatMessages extends Model<AiChatMessagesAttributes, AiChatMessagesCreationAttributes> implements AiChatMessagesAttributes {
  id!: string;
  deviceId!: string;
  userId?: string;
  content?: string;
  functionName?: string;
  functionArguments?: object;
  model?: string;
  role!: string;
  tokens?: number;
  createdTime?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof AiChatMessages {
    return AiChatMessages.init({
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
      comment: "UUID 消息ID"
    },
    deviceId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'device_id'
    },
    userId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'user_id'
    },
    content: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    functionName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "函数调用名称（如有）",
      field: 'function_name'
    },
    functionArguments: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: "函数调用参数（如有）",
      field: 'function_arguments'
    },
    model: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "生成该回复的模型"
    },
    role: {
      type: DataTypes.STRING(10),
      allowNull: false,
      comment: "角色"
    },
    tokens: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "该消息的token数"
    },
    createdTime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'created_time'
    }
  }, {
    sequelize,
    tableName: 'ai_chat_messages',
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
