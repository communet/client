import { useChatList } from '../../api';
import { ContextMenu } from '../../../../shared/ui';

import { ChatItem } from './../chat-item';
import { CHAT_ITEM_CONTEXT_MENU_ITEMS } from './constants';

import type { FC } from 'react';
import type { ChatListContextMenuItemValue, ChatListProps } from './types';

export const ChatList: FC<ChatListProps> = ({
  chatId,
  channelId,
  onDelete,
  onUpdate,
}) => {
  const chats = useChatList(channelId);

  const valueToEventMap: Record<
    ChatListContextMenuItemValue,
    ChatListProps['onDelete'] | ChatListProps['onUpdate']
  > = {
    delete: onDelete,
    update: onUpdate,
  };

  return chats.data?.map((chat) => (
    <ContextMenu
      items={CHAT_ITEM_CONTEXT_MENU_ITEMS}
      key={chat.id}
      onClick={(_, value) =>
        valueToEventMap[value as ChatListContextMenuItemValue]?.(chat)
      }
    >
      <ChatItem key={chat.id} chat={chat} isActive={chat.id === chatId} />
    </ContextMenu>
  ));
};
