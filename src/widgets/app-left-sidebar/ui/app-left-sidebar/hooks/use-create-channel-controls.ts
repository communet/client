import { useDisclosure } from '@mantine/hooks';
import { useRouter } from '@tanstack/react-router';

import { useCreateChannel } from '../../../api';

export const useCreateChannelControls = () => {
  const createChannelMutation = useCreateChannel();
  const router = useRouter();

  const [
    isCreateChannelModalOpen,
    { open: openCreateChannelModal, close: closeCreateChannelModal },
  ] = useDisclosure();

  const handleCreateChannel = async (value: string): Promise<void> => {
    if (!value) {
      return;
    }

    const result = await createChannelMutation.mutateAsync(value);

    if (!result.error) {
      await router.navigate({
        to: `/channels/$channelId`,
        params: { channelId: result.data.id },
      });
    }
  };

  return {
    isCreateChannelModalOpen,
    openCreateChannelModal,
    closeCreateChannelModal,
    handleCreateChannel,
  };
};
