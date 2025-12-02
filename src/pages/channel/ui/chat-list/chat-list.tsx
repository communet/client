import { useChatList } from '../../api';
import { ContextMenu } from '../../../../shared/ui';

import { ChatItem } from './../chat-item';
import { CHAT_ITEM_CONTEXT_MENU_ITEMS } from './constants';

import type { FC } from 'react';
import type { ChatListProps } from './types';

export const ChatList: FC<ChatListProps> = ({
  chatId,
  channelId,
  onDelete,
  onUpdate,
}) => {
  const chats = useChatList(channelId);

  const valueToEventMap: Record<
    (typeof CHAT_ITEM_CONTEXT_MENU_ITEMS)[number]['value'],
    ChatListProps['onDelete'] | ChatListProps['onUpdate']
  > = {
    delete: onDelete,
    update: onUpdate,
  };

  return (
    chats.data &&
    chats.data.map((chat) => (
      <ContextMenu
        // NOTE: constant satisfies of type `ContextMenuItem[]` and cannot be `errored value`
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        items={CHAT_ITEM_CONTEXT_MENU_ITEMS}
        key={chat.id}
        onClick={(_, value) => valueToEventMap[value]?.(chat)}
      >
        <ChatItem key={chat.id} chat={chat} isActive={chat.id === chatId} />
      </ContextMenu>
    ))
  );
};
