import { Box, Flex, Stack, TextInput } from '@mantine/core';
import { useState, type FC } from 'react';

import { MessageList } from '../message-list';

import styles from './styles.module.scss';

import type { ChatPageProps } from './types';

export const ChatPage: FC<ChatPageProps> = ({ chatId, channelId }) => {
  const [value, setValue] = useState('');

  const sendMessage = (e: React.FormEvent): void => {
    e.preventDefault();
    // TODO: отправить сообщение
  };

  // TODO: добавить нормальное отображение переносов строк в поле ввода
  return (
    <Flex className={styles['app-chat__wrapper']}>
      <Stack className={styles['app-chat']}>
        <Box className={styles['app-chat__message-list']}>
          <MessageList channelId={channelId} chatId={chatId} />
        </Box>
        <form onSubmit={sendMessage}>
          <TextInput
            classNames={{
              input: styles['app-chat__message-input'],
            }}
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            placeholder="Сообщение..."
            radius="md"
          />
        </form>
      </Stack>
    </Flex>
  );
};
