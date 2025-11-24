import { Button, Group, ScrollArea, Stack, Title } from '@mantine/core';
import { useParams } from '@tanstack/react-router';
import { IconPlus } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useQueryClient } from '@tanstack/react-query';

import { ChannelList } from '../channel-list';
import { ModalPrompt } from '../../../../shared/ui';
import { api } from '../../../../shared/api';
import { CHANNEL_LIST_QUERY_KEY } from '../../api/constants';
import { ChannelModel } from '../../model';

import styles from './styles.module.scss';

import type { FC } from 'react';
import type { AppLeftSidebarProps } from './types';

export const AppLeftSidebar: FC<AppLeftSidebarProps> = ({
  activeChannelId: _activeChannelId,
  children,
}) => {
  const { channelId } = useParams({ strict: false });
  const [isOpen, { open, close }] = useDisclosure();
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

      <ScrollArea className={styles['app-left-sidebar']}>
        <Stack gap="md">
          <ChannelList selectedId={channelId} />

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
