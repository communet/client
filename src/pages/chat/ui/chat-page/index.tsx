import { Box, Button, Group, Stack, Textarea } from '@mantine/core';
import { useRef, type FC } from 'react';

import { MessageList } from '../message-list';
import { useMessageSend } from '../../api';

import styles from './styles.module.scss';
import { useMessageInputControl } from './hooks';

import type { ChatPageProps } from './types';

export const ChatPage: FC<ChatPageProps> = ({ chatId, channelId }) => {
  const messageListRef = useRef<{ scrollToBottom: () => void }>(null);
  const sendMutation = useMessageSend(channelId, chatId);
  const submit = (content: string): void => {
    sendMutation.mutate(content, {
      onSuccess: () =>
        setTimeout(() => messageListRef.current?.scrollToBottom(), 0),
    });
  };

  const { value, ...controls } = useMessageInputControl(submit);

  // TODO: добавить нормальное отображение переносов строк в поле ввода
  return (
    <Stack className={styles['app-chat__wrapper']}>
      <Box className={styles['app-chat__message-list']}>
        <MessageList
          ref={messageListRef}
          channelId={channelId}
          chatId={chatId}
        />
      </Box>

      <Group gap="md" align="flex-end">
        <Textarea
          className={styles['app-chat__message-input-wrapper']}
          classNames={{
            input: styles['app-chat__message-input'],
          }}
          autosize
          maxRows={4}
          value={value}
          placeholder="Сообщение..."
          radius="md"
          {...controls}
        />

        <Button
          radius="md"
          color="cyan"
          loading={sendMutation.isPending}
          onClick={() => submit(value)}
        >
          Отправить
        </Button>
      </Group>
    </Stack>
  );
};
