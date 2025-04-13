import type { Sequelize } from "sequelize";
import { AiChatConversations as _AiChatConversations } from "./AiChatConversations";
import type { AiChatConversationsAttributes, AiChatConversationsCreationAttributes } from "./AiChatConversations";
import { AiChatMessages as _AiChatMessages } from "./AiChatMessages";
import type { AiChatMessagesAttributes, AiChatMessagesCreationAttributes } from "./AiChatMessages";
import { Label as _Label } from "./Label";
import type { LabelAttributes, LabelCreationAttributes } from "./Label";
import { Subject as _Subject } from "./Subject";
import type { SubjectAttributes, SubjectCreationAttributes } from "./Subject";
import { User as _User } from "./User";
import type { UserAttributes, UserCreationAttributes } from "./User";

export {
  _AiChatConversations as AiChatConversations,
  _AiChatMessages as AiChatMessages,
  _Label as Label,
  _Subject as Subject,
  _User as User,
};

export type {
  AiChatConversationsAttributes,
  AiChatConversationsCreationAttributes,
  AiChatMessagesAttributes,
  AiChatMessagesCreationAttributes,
  LabelAttributes,
  LabelCreationAttributes,
  SubjectAttributes,
  SubjectCreationAttributes,
  UserAttributes,
  UserCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const AiChatConversations = _AiChatConversations.initModel(sequelize);
  const AiChatMessages = _AiChatMessages.initModel(sequelize);
  const Label = _Label.initModel(sequelize);
  const Subject = _Subject.initModel(sequelize);
  const User = _User.initModel(sequelize);


  return {
    AiChatConversations: AiChatConversations,
    AiChatMessages: AiChatMessages,
    Label: Label,
    Subject: Subject,
    User: User,
  };
}
