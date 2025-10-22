import { useChatList } from '../../api';

import { ChatItem } from './../chat-item';

import type { FC } from 'react';
import type { ChatListProps } from './types';

export const ChatList: FC<ChatListProps> = ({ chatId, channelId }) => {
  const chats = useChatList(channelId);

  return (
    chats.data &&
    chats.data.map((chat) => (
      <ChatItem key={chat.id} chat={chat} isActive={chat.id === chatId} />
    ))
  );
};
