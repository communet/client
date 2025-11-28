import { Button, Group, ScrollArea, Stack, Title } from '@mantine/core';
import { useParams } from '@tanstack/react-router';
import { IconPlus } from '@tabler/icons-react';
import { type FC } from 'react';

import { ChannelList } from '../channel-list';
import { ModalConfirm, ModalPrompt } from '../../../../shared/ui';

import styles from './styles.module.scss';
import {
  useCreateChannelControls,
  useDeleteChannelControls,
  useUpdateChannelControls,
} from './hooks';

import type { AppLeftSidebarProps } from './types';

export const AppLeftSidebar: FC<AppLeftSidebarProps> = ({
  activeChannelId: _activeChannelId,
  children,
}) => {
  const { channelId } = useParams({ strict: false });
  const {
    isUpdateChannelModalOpen,
    selectedOnUpdateChannel,
    handleOpenUpdateChannelModal,
    handleCloseUpdateChannelModal,
    handleUpdateChannel,
  } = useUpdateChannelControls();
  const {
    isCreateChannelModalOpen,
    handleCreateChannel,
    openCreateChannelModal,
    closeCreateChannelModal,
  } = useCreateChannelControls();
  const {
    isDeleteChannelModalOpen,
    selectedToDeleteChannel,
    handleOpenDeleteChannelModal,
    handleCloseDeleteChannelModal,
    handleDeleteChannel,
  } = useDeleteChannelControls();

  return (
    <Group className={styles['app-left-sidebar__wrapper']}>
      <ModalPrompt
        centered
        opened={isCreateChannelModalOpen}
        title={<Title order={2}>Новый канал</Title>}
        label="Название канала"
        placeholder="Введите название канала"
        submitLabel="Создать"
        onClose={closeCreateChannelModal}
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
        opened={isDeleteChannelModalOpen && !!selectedToDeleteChannel.current}
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
            onClick={openCreateChannelModal}
          >
            <IconPlus />
          </Button>
        </Stack>
      </ScrollArea>

      {children}
    </Group>
  );
};
