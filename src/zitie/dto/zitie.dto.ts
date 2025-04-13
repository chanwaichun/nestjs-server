import { AiChatMessages } from '../../dao/AiChatMessages';

type RoleType = 'user' | 'system' | 'assistant';

export class AddMessageDto extends AiChatMessages {
  override role: RoleType;
}
