import { Button, Group, ScrollArea, Stack, Title } from '@mantine/core';
import { useParams, useRouter } from '@tanstack/react-router';
import { IconPlus } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useRef, type FC } from 'react';

import { ChannelList } from '../channel-list';
import { ModalConfirm, ModalPrompt } from '../../../../shared/ui';
import { ChannelModel } from '../../model';
import {
  useChannelList,
  useCreateChannel,
  useDeleteChannel,
  useUpdateChannel,
} from '../../api';

import styles from './styles.module.scss';

import type { AppLeftSidebarProps } from './types';

// TODO: вынести по отдельным хукам все действия с каналами
export const AppLeftSidebar: FC<AppLeftSidebarProps> = ({
  activeChannelId: _activeChannelId,
  children,
}) => {
  const { channelId } = useParams({ strict: false });
  const [isOpen, { open, close }] = useDisclosure();
  const [
    isUpdateChannelModalOpen,
    { open: openUpdateChannelModal, close: closeUpdateChannelModal },
  ] = useDisclosure();
  const [
    isDeleteChannelModalOpen,
    { open: openDeleteChannelModal, close: closeDeleteChannelModal },
  ] = useDisclosure();
  const selectedOnDeletionChannel = useRef<ChannelModel | null>(null);
  const selectedOnUpdateChannel = useRef<ChannelModel | null>(null);

  const handleOpenDeleteChannelModal = (channel: ChannelModel): void => {
    selectedOnDeletionChannel.current = channel;
    openDeleteChannelModal();
  };

  const handleCloseDeleteChannelModal = (): void => {
    closeDeleteChannelModal();
    selectedOnDeletionChannel.current = null;
  };

  const handleOpenUpdateChannelModal = (channel: ChannelModel): void => {
    selectedOnUpdateChannel.current = channel;
    openUpdateChannelModal();
  };

  const handleCloseUpdateChannelModal = (): void => {
    closeUpdateChannelModal();
    selectedOnUpdateChannel.current = null;
  };

  const updateChannelMutation = useUpdateChannel();
  const createChannelMutation = useCreateChannel();
  const deleteChannelMutation = useDeleteChannel();
  const channelList = useChannelList();
  const router = useRouter();

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

  const handleUpdateChannel = async (value: string): Promise<void> => {
    if (!value || !selectedOnUpdateChannel.current) {
      return;
    }

    await updateChannelMutation.mutateAsync({
      id: selectedOnUpdateChannel.current.id,
      name: value,
    });
  };

  const handleDeleteChannel = async (): Promise<void> => {
    if (!selectedOnDeletionChannel.current) {
      return;
    }

    const result = await deleteChannelMutation.mutateAsync(
      selectedOnDeletionChannel.current.id,
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

  return (
    <Group className={styles['app-left-sidebar__wrapper']}>
      <ModalPrompt
        centered
        opened={isOpen}
        title={<Title order={2}>Новый канал</Title>}
        label="Название канала"
        placeholder="Введите название канала"
        submitLabel="Создать"
        onClose={close}
        onSubmit={handleCreateChannel}
      />

      <ModalPrompt
        centered
        opened={isUpdateChannelModalOpen && !!selectedOnUpdateChannel.current}
        title={<Title order={2}>Редактировать канал</Title>}
        label="Название канала"
        placeholder="Введите название канала"
        submitLabel="Сохранить"
        defaultValue={selectedOnUpdateChannel.current?.name}
        onClose={handleCloseUpdateChannelModal}
        onSubmit={handleUpdateChannel}
      />

      <ModalConfirm
        centered
        opened={isDeleteChannelModalOpen}
        title={<Title order={2}>Удалить канал</Title>}
        description="Вы действительно хотите удалить канал?"
        acceptLabel="Удалить"
        declineLabel="Отменить"
        onClose={handleCloseDeleteChannelModal}
        onAccept={handleDeleteChannel}
      />

      <ScrollArea className={styles['app-left-sidebar']}>
        <Stack gap="md">
          <ChannelList
            selectedId={channelId}
            onUpdate={handleOpenUpdateChannelModal}
            onDelete={handleOpenDeleteChannelModal}
          />

          <Button
            classNames={{
              root: styles['app-left-sidebar__create-channel-button'],
            }}
            size="lg"
            variant="light"
            color="cyan"
            fullWidth
            onClick={open}
          >
            <IconPlus />
          </Button>
        </Stack>
      </ScrollArea>

      {children}
    </Group>
  );
};
