import { Flex } from '@mantine/core';

import { MessageList } from '../message-list';

import styles from './styles.module.scss';

import type { FC } from 'react';
import type { ChatPageProps } from './types';

export const ChatPage: FC<ChatPageProps> = ({ chatId, channelId }) => (
  <Flex className={styles['app-chat']}>
    <MessageList channelId={channelId} chatId={chatId} />
  </Flex>
);
