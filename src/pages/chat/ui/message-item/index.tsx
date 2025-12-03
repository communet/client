import { Avatar, Box, Group, Text, Textarea } from '@mantine/core';
import { useState, type FC } from 'react';

import { ContextMenu } from '../../../../shared/ui';
import { MessageModel } from '../../model';

import styles from './styles.module.scss';
import { MESSAGE_ITEM_CONTEXT_MENU_ITEMS } from './constants';

import type React from 'react';

export type MessageItemProps = {
  isAvatarShown?: boolean;
  message: MessageModel;

  onUpdate?: (message: MessageModel) => void | Promise<void>;
  onDelete?: (message: MessageModel) => void;
};

export const MessageItem: FC<MessageItemProps> = ({
  isAvatarShown,
  message,
  onUpdate,
  onDelete,
}: MessageItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message.content);

  const handleSelectMenu = (_: React.MouseEvent, value: string) => {
    if (value === 'update') {
      setIsEditing(true);
    } else if (value === 'delete') {
      onDelete?.(message);
    }
  };

  const handleSaveMessage = async () => {
    const newMessage = new MessageModel(
      message.id,
      editedMessage,
      message.chatId,
      message.senderId,
      message.createdAt,
    );

    setIsEditing(false);
    setEditedMessage(message.content);

    const maybePromise = onUpdate?.(newMessage);

    if (maybePromise) {
      await maybePromise;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      e.preventDefault();

      setIsEditing(false);
      setEditedMessage(message.content);
    }
  };

  return (
    <Group
      className={`${styles['message-item-wrapper']} ${isEditing ? styles.editing : ''}`}
      align="center"
    >
      <Avatar
        size="md"
        color="initials"
        variant="filled"
        name={message.senderId}
        opacity={isAvatarShown ? 1 : 0}
        classNames={{
          placeholder: styles['message-item__avatar-placeholder'],
        }}
      />

      <Box w="100%">
        {isEditing ? (
          <Textarea
            size="md"
            className={styles['message-item__edit-input-wrapper']}
            classNames={{
              input: styles['message-item__edit-input'],
            }}
            autosize
            autoFocus
            value={editedMessage}
            placeholder="Сообщение..."
            radius="md"
            onChange={(e) => setEditedMessage(e.target.value)}
            onBlur={handleSaveMessage}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <ContextMenu
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            items={MESSAGE_ITEM_CONTEXT_MENU_ITEMS}
            onClick={handleSelectMenu}
          >
            <Text size="md" className={styles['message-item']}>
              {message.content}
            </Text>
          </ContextMenu>
        )}
      </Box>
    </Group>
  );
};
