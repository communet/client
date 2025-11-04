import { ScrollArea, Stack } from '@mantine/core';

import { useMessageList } from '../../api';
import { MessageItem } from '../message-item';

import styles from './styles.module.scss';

import type { FC } from 'react';

export type MessageListProps = {
  channelId: string;
  chatId: string;
};

export const MessageList: FC<MessageListProps> = ({
  channelId,
  chatId,
}: MessageListProps) => {
  const messages = useMessageList(channelId, chatId);

  return (
    <ScrollArea className={styles['message-list']}>
      <Stack align="stretch" gap="xs">
        {messages.data &&
          messages.data.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
      </Stack>
    </ScrollArea>
  );
};
