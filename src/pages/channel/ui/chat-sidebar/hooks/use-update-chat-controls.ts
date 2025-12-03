import { useDisclosure } from '@mantine/hooks';
import { useRef } from 'react';

import { useUpdateChatMutation } from '../../../api';

import type { ChatModel } from '../../../model';

export const useUpdateChatControls = (channelId: string) => {
  const [
    isUpdateChatModalOpen,
    { open: openUpdateChatModal, close: closeUpdateChatModal },
  ] = useDisclosure();
  const selectedToUpdateChat = useRef<ChatModel>(null);
  const updateChatMutation = useUpdateChatMutation();

  const handleOpenUpdateChatModal = (chat: ChatModel): void => {
    selectedToUpdateChat.current = chat;
    openUpdateChatModal();
  };

  const handleCloseUpdateChatModal = (): void => {
    closeUpdateChatModal();
    selectedToUpdateChat.current = null;
  };

  const handleUpdateChat = async (value: string): Promise<void> => {
    if (!value || !selectedToUpdateChat.current) {
      return;
    }

    await updateChatMutation.mutateAsync({
      chatId: selectedToUpdateChat.current.id,
      name: value,
      channelId,
    });
  };

  return {
    isUpdateChatModalOpen,
    selectedToUpdateChat,
    handleOpenUpdateChatModal,
    handleCloseUpdateChatModal,
    handleUpdateChat,
  };
};
