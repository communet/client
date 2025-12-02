import type { ChatModel } from '../../model';

export type ChatListProps = {
  chatId?: string;
  channelId: string;

  onDelete?: (chat: ChatModel) => void;
  onUpdate?: (chat: ChatModel) => void;
};
