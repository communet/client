import { ChatItem } from './../chat-item';
import { MOCK_CHATS } from './constants';

import type { FC } from 'react';
import type { ChatModel } from '../../model';
import type { ChatListProps } from './types';

export const ChatList: FC<ChatListProps> = ({ chatId }) => {
  const chats: ChatModel[] = MOCK_CHATS;

  return chats.map((chat) => (
    <ChatItem chat={chat} isActive={chat.id === chatId} />
  ));
};
