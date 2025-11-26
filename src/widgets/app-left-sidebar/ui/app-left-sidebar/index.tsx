import { Button, Group, ScrollArea, Stack, Title } from '@mantine/core';
import { useParams } from '@tanstack/react-router';
import { IconPlus } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { useState, type FC } from 'react';

import { ChannelList } from '../channel-list';
import { ModalPrompt } from '../../../../shared/ui';
import { api } from '../../../../shared/api';
import { CHANNEL_LIST_QUERY_KEY } from '../../api/constants';
import { ChannelModel } from '../../model';

import styles from './styles.module.scss';

import type { AppLeftSidebarProps } from './types';

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

  const [updateModalValue, setUpdateModalValue] = useState<ChannelModel>();
  const handleOpenUpdateChannelModal = (channel: ChannelModel): void => {
    setUpdateModalValue(channel);
    openUpdateChannelModal();
  };

  const handleCloseUpdateChannelModal = (): void => {
    closeUpdateChannelModal();
    setUpdateModalValue(undefined);
  };

  const clientQuery = useQueryClient();

  const onSubmit = async (value: string): Promise<void> => {
    if (!value) {
      return;
    }

    const response = await api.channel.create(value);

    if (!response.error) {
      clientQuery.setQueryData(
        [CHANNEL_LIST_QUERY_KEY],
        (channels: ChannelModel[]) => [
          ...channels,
          new ChannelModel(
            response.data.id,
            response.data.name,
            response.data.creatorId,
          ),
        ],
      );
    }
  };

  const onUpdateChannel = async (value: string): Promise<void> => {
    if (!value || !updateModalValue) {
      return;
    }

    const response = await api.channel.update(updateModalValue.id, value);

    if (!response.error) {
      clientQuery.setQueryData(
        [CHANNEL_LIST_QUERY_KEY],
        (channels: ChannelModel[]) =>
          channels.map((channel) => {
            if (channel.id === response.data.id) {
              return new ChannelModel(
                response.data.id,
                response.data.name,
                response.data.creatorId,
              );
            }

            return channel;
          }),
      );
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
        onSubmit={onSubmit}
      />

      <ModalPrompt
        centered
        opened={isUpdateChannelModalOpen && !!updateModalValue}
        title={<Title order={2}>Редактировать канал</Title>}
        label="Название канала"
        placeholder="Введите название канала"
        submitLabel="Сохранить"
        defaultValue={updateModalValue?.name}
        onClose={handleCloseUpdateChannelModal}
        onSubmit={onUpdateChannel}
      />

      <ScrollArea className={styles['app-left-sidebar']}>
        <Stack gap="md">
          <ChannelList
            selectedId={channelId}
            onUpdate={handleOpenUpdateChannelModal}
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
