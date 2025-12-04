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

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
      setEditedMessage(message.content);

      return true;
    } else if (e.key === 'Enter' && e.ctrlKey) {
      void handleSaveMessage();

      return true;
    }

    return false;
  };

  const handleChangeMessage = (content: string) => {
    setEditedMessage(content);
  };

  return {
    isEditing,
    editedMessage,
    enableEditMode,
    handleKeyDown,
    handleChangeMessage,
  };
};
