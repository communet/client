import { Text, UnstyledButton } from '@mantine/core';

import styles from './styles.module.scss';

import type { MessageModel } from '../../model';
import type { FC } from 'react';

export type MessageItemProps = {
  message: MessageModel;
};

export const MessageItem: FC<MessageItemProps> = ({
  message,
}: MessageItemProps) => {
  return (
    <UnstyledButton
      className={styles['message-item']}
      variant="subtle"
      color="gray"
    >
      <Text>{message.content}</Text>
    </UnstyledButton>
  );
};
