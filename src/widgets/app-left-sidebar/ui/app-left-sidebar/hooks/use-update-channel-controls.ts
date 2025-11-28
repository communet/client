import { useDisclosure } from '@mantine/hooks';
import { useRef } from 'react';

import { useUpdateChannel } from '../../../api';

import type { ChannelModel } from '../../../model';

export const useUpdateChannelControls = () => {
  const updateChannelMutation = useUpdateChannel();
  const [
    isUpdateChannelModalOpen,
    { open: openUpdateChannelModal, close: closeUpdateChannelModal },
  ] = useDisclosure();

  const selectedOnUpdateChannel = useRef<ChannelModel>(null);

  const handleOpenUpdateChannelModal = (channel: ChannelModel): void => {
    selectedOnUpdateChannel.current = channel;
    openUpdateChannelModal();
  };

  const handleCloseUpdateChannelModal = (): void => {
    closeUpdateChannelModal();
    selectedOnUpdateChannel.current = null;
  };

  const handleUpdateChannel = async (value: string): Promise<void> => {
    if (!value || !selectedOnUpdateChannel.current) {
      return;
    }

    await updateChannelMutation.mutateAsync({
      id: selectedOnUpdateChannel.current.id,
      name: value,
    });
  };

  return {
    isUpdateChannelModalOpen,
    selectedOnUpdateChannel,
    handleOpenUpdateChannelModal,
    handleCloseUpdateChannelModal,
    handleUpdateChannel,
  };
};
