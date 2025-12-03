import type { ChatListProps } from '../chat-list';

export type ChatSidebarProps = React.PropsWithChildren<
  Pick<ChatListProps, 'channelId' | 'chatId'>
>;
