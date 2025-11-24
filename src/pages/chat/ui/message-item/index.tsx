import { Text } from '@mantine/core';

import styles from './styles.module.scss';

import type { MessageModel } from '../../model';
import type { FC } from 'react';

export type MessageItemProps = {
  message: MessageModel;
};

export const MessageItem: FC<MessageItemProps> = ({
  message,
}: MessageItemProps) => {
  return <Text className={styles['message-item']}>{message.content}</Text>;
};
