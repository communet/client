import { useDisclosure } from '@mantine/hooks';
import { useRef } from 'react';

import { useMessageDelete } from '../../../api';

export const useDeleteMessageControls = (channelId: string, chatId: string) => {
  const [
    isDeleteMessageModalOpen,
    { open: openDeleteMessageModal, close: closeDeleteMessageModal },
  ] = useDisclosure();
  const deleteMessageMutation = useMessageDelete(channelId, chatId);
  const messageToDelete = useRef<string | null>(null);

  const handleDeleteMessage = () => {
    if (messageToDelete.current) {
      deleteMessageMutation.mutate(messageToDelete.current);
    }
  };

  const handleOpenDeleteMessageModal = (messageId: string) => {
    messageToDelete.current = messageId;
    openDeleteMessageModal();
  };

  const handleCloseDeleteMessageModal = () => {
    messageToDelete.current = null;
    closeDeleteMessageModal();
  };

  return {
    isDeleteMessageModalOpen,
    messageToDelete,
    handleOpenDeleteMessageModal,
    handleCloseDeleteMessageModal,
    handleDeleteMessage,
  };
};
