import { Avatar, Group } from '@mantine/core';

import { ContextMenu } from '../../../../shared/ui';
import { MessageModel } from '../../model';
import { Editor } from '../editor';

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
        align="flex-start"
        gap="8px"
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

        <Editor
          classNames={{
            root: `${isEditing ? styles.editing : ''} ${styles['message-item__editor']}`,
          }}
          content={editedMessage}
          isReadOnly={!isEditing}
          onChange={handleChangeMessage}
          onKeyDown={handleKeyDown}
        />
      </Group>
    </ContextMenu>
  );
};
