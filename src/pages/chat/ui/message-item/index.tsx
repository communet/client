import { Avatar, Group, Text } from '@mantine/core';

import styles from './styles.module.scss';

import type { MessageModel } from '../../model';
import type { FC } from 'react';

export type MessageItemProps = {
  isAvatarShown?: boolean;
  message: MessageModel;
};

export const MessageItem: FC<MessageItemProps> = ({
  isAvatarShown,
  message,
}: MessageItemProps) => {
  return (
    <Group
      className={styles['message-item-wrapper']}
      gap="xs"
      align="flex-start"
    >
      <Avatar
        size="md"
        color="initials"
        variant="filled"
        name={message.senderId}
        opacity={isAvatarShown ? 1 : 0}
      />

      <Text size="md" className={styles['message-item']}>
        {message.content}
      </Text>
    </Group>
  );
};
