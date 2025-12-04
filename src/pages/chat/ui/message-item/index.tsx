import { Avatar, Group, Text, Textarea } from '@mantine/core';

import { ContextMenu } from '../../../../shared/ui';
import { MessageModel } from '../../model';

import styles from './styles.module.scss';
import { MESSAGE_ITEM_CONTEXT_MENU_ITEMS } from './constants';
import { useMessageUpdateControls } from './hooks';

import type { FC } from 'react';
import type React from 'react';

export type MessageItemProps = {
  isAvatarShown?: boolean;
  message: MessageModel;

  onUpdate?: (message: MessageModel) => void | Promise<void>;
  onDelete?: (messageId: string) => void;
};

export const MessageItem: FC<MessageItemProps> = ({
  isAvatarShown,
  message,

  onUpdate,
  onDelete,
}) => {
  const {
    isEditing,
    editedMessage,
    enableEditMode,
    handleSaveMessage,
    handleKeyDown,
    handleChangeMessage,
  } = useMessageUpdateControls(message, onUpdate ?? (() => {}));

  const handleSelectMenu = (_: React.MouseEvent, value: string) => {
    switch (value) {
      case 'update':
        enableEditMode();
        break;
      case 'delete':
        onDelete?.(message.id);
        break;
    }
  };

  return (
    <ContextMenu
      items={MESSAGE_ITEM_CONTEXT_MENU_ITEMS}
      disabled={isEditing}
      onClick={handleSelectMenu}
    >
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
            onChange={handleChangeMessage}
            onBlur={handleSaveMessage}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <Text size="md" className={styles['message-item']}>
            {message.content}
          </Text>
        )}
      </Group>
    </ContextMenu>
  );
};
