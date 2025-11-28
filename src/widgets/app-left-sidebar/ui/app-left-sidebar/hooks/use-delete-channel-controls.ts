import { useDisclosure } from '@mantine/hooks';
import { useRouter } from '@tanstack/react-router';
import { useRef } from 'react';

import { useDeleteChannel, useChannelList } from '../../../api';

import type { ChannelModel } from '../../../model';

export const useDeleteChannelControls = () => {
  const [
    isDeleteChannelModalOpen,
    { open: openDeleteChannelModal, close: closeDeleteChannelModal },
  ] = useDisclosure();

  const deleteChannelMutation = useDeleteChannel();
  const channelList = useChannelList();
  const router = useRouter();

  const selectedToDeleteChannel = useRef<ChannelModel | null>(null);

  const handleOpenDeleteChannelModal = (channel: ChannelModel): void => {
    selectedToDeleteChannel.current = channel;
    openDeleteChannelModal();
  };

  const handleCloseDeleteChannelModal = (): void => {
    closeDeleteChannelModal();
    selectedToDeleteChannel.current = null;
  };

  const handleDeleteChannel = async (): Promise<void> => {
    if (!selectedToDeleteChannel.current) {
      return;
    }

    const result = await deleteChannelMutation.mutateAsync(
      selectedToDeleteChannel.current.id,
    );

    if (!result.error) {
      if (channelList.data?.length) {
        await router.navigate({
          replace: true,
          to: `/channels/$channelId`,
          params: { channelId: channelList.data[0].id },
        });
      } else {
        await router.navigate({ to: '/', replace: true });
      }
    }
  };

  return {
    isDeleteChannelModalOpen,
    selectedToDeleteChannel,
    handleOpenDeleteChannelModal,
    handleCloseDeleteChannelModal,
    handleDeleteChannel,
  };
};
