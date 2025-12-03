import { useDisclosure } from '@mantine/hooks';
import { useRouter } from '@tanstack/react-router';

import { useCreateChatMutation } from '../../../api';

export const useCreateChatControls = (channelId: string) => {
  const createChatMutation = useCreateChatMutation();
  const router = useRouter();
  const [
    isCreateChatModalOpen,
    { open: openCreateChatModal, close: closeCreateChatModal },
  ] = useDisclosure();

  const handleCreateChat = async (value: string): Promise<void> => {
    if (!value) {
      return;
    }

    const response = await createChatMutation.mutateAsync({
      name: value,
      channelId,
    });

    if (!response.error) {
      await router.navigate({
        to: `/channels/$channelId/chats/$chatId`,
        params: { channelId, chatId: response.data.id },
      });
    }
  };

  return {
    isCreateChatModalOpen,
    openCreateChatModal,
    closeCreateChatModal,
    handleCreateChat,
  };
};
