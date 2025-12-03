import { useRouter } from '@tanstack/react-router';
import { useDisclosure } from '@mantine/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';

import { useDeleteChatMutation } from '../../../api';
import { CHAT_LIST_QUERY_KEY } from '../../../api/constants';

import type { ChatModel } from '../../../model';

export const useDeleteChatControls = (channelId: string) => {
  const deleteChatMutation = useDeleteChatMutation();
  const clientQuery = useQueryClient();
  const router = useRouter();
  const [
    isDeleteChatModalOpen,
    { open: openDeleteChatModal, close: closeDeleteChatModal },
  ] = useDisclosure();
  const selectedToDeleteChat = useRef<ChatModel | null>(null);

  const handleOpenDeleteChatModel = (chat: ChatModel) => {
    selectedToDeleteChat.current = chat;
    openDeleteChatModal();
  };

  const handleCloseDeleteChatModal = () => {
    closeDeleteChatModal();
    selectedToDeleteChat.current = null;
  };

  const handleDeleteChat = async () => {
    if (!selectedToDeleteChat.current) {
      return;
    }

    const response = await deleteChatMutation.mutateAsync({
      chatId: selectedToDeleteChat.current.id,
      channelId,
    });

    const chats = clientQuery.getQueryData<ChatModel[]>([
      CHAT_LIST_QUERY_KEY,
      channelId,
    ]);

    if (!response.error) {
      if (chats?.length) {
        await router.navigate({
          to: `/channels/$channelId/chats/$chatId`,
          params: { channelId, chatId: chats[0].id },
        });
      } else {
        await router.navigate({
          to: `/channels/$channelId`,
          params: { channelId },
        });
      }
    }
  };

  return {
    isDeleteChatModalOpen,
    selectedToDeleteChat,
    handleOpenDeleteChatModel,
    handleCloseDeleteChatModal,
    handleDeleteChat,
  };
};
