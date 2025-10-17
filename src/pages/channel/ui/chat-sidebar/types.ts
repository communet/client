import type { ChatModel } from './chat.model';

export type ChatItemProps = {
  chat: ChatModel;
  isActive: boolean;
};

export type ChatListProps = {
  chatId: string;
};

export type ChatSidebarProps = React.PropsWithChildren<{
  chatId: string;
}>;
