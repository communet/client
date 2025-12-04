import { useState } from 'react';

import { MessageModel } from '../../../model';

export const useMessageUpdateControls = (
  message: MessageModel,
  onUpdate: (message: MessageModel) => void | Promise<void>,
) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message.content);

  const enableEditMode = () => {
    setIsEditing(true);
    setEditedMessage(message.content);
  };

  const handleSaveMessage = async () => {
    if (editedMessage === message.content) {
      setIsEditing(false);
      return;
    }

    setIsEditing(false);
    setEditedMessage(message.content);

    const result = onUpdate(
      new MessageModel(
        message.id,
        editedMessage,
        message.chatId,
        message.senderId,
        message.createdAt,
      ),
    );

    if (result instanceof Promise) {
      await result;
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

  const handleChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedMessage(e.target.value);
  };

  return {
    isEditing,
    editedMessage,
    enableEditMode,
    handleSaveMessage,
    handleKeyDown,
    handleChangeMessage,
  };
};
