import { Box, Button, Flex, Stack, TextInput } from '@mantine/core';
import { useState, type FC } from 'react';

import { MessageList } from '../message-list';
import { useMessageSend } from '../../api';

import styles from './styles.module.scss';

import type { ChatPageProps } from './types';

export const ChatPage: FC<ChatPageProps> = ({ chatId, channelId }) => {
  const [value, setValue] = useState('');
  const sendMutation = useMessageSend(channelId, chatId);

  const sendMessage = (e: React.FormEvent): void => {
    if (!value) {
      return;
    }

    e.preventDefault();

    sendMutation.mutate(value);

    setValue('');
  };

  // TODO: добавить нормальное отображение переносов строк в поле ввода
  return (
    <Flex className={styles['app-chat__wrapper']}>
      <Stack className={styles['app-chat']}>
        <Box className={styles['app-chat__message-list']}>
          <MessageList channelId={channelId} chatId={chatId} />
        </Box>
        <form
          className={styles['app-chat__message-form']}
          onSubmit={sendMessage}
        >
          <TextInput
            className={styles['app-chat__message-input-wrapper']}
            classNames={{
              input: styles['app-chat__message-input'],
            }}
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            placeholder="Сообщение..."
            radius="md"
          />

          <Button
            type="submit"
            radius="md"
            color="cyan"
            loading={sendMutation.isPending}
          >
            Отправить
          </Button>
        </form>
      </Stack>
    </Flex>
  );
};
