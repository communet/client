import { Flex } from '@mantine/core';

import styles from './styles.module.scss';

import type { FC } from 'react';
import type { ChatPageProps } from './types';

export const ChatPage: FC<ChatPageProps> = ({ chatId, channelId }) => (
  <Flex className={styles['app-chat']}>
    You now in chat: {chatId} in channel: {channelId}
  </Flex>
);
