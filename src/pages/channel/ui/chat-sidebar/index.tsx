import { Button, Group, ScrollArea, Stack, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useQueryClient } from '@tanstack/react-query';

import { ModalPrompt } from '../../../../shared/ui';
import { api } from '../../../../shared/api';
import { ChatModel } from '../../model';
import { CHAT_LIST_QUERY_KEY } from '../../api/constants';

import { ChatList } from './../chat-list';
import styles from './styles.module.scss';

import type { FC } from 'react';
import type { ChatSidebarProps } from './types';

export const ChatSidebar: FC<ChatSidebarProps> = ({
  children,
  channelId,
  ...rest
}) => {
  const [isOpen, { open, close }] = useDisclosure();
  const clientQuery = useQueryClient();

  const onSubmit = async (value: string): Promise<void> => {
    if (!value) {
      return;
    }

    const result = await api.chat.create(channelId, value);

    if (!result.error) {
      clientQuery.setQueryData(
        [CHAT_LIST_QUERY_KEY, channelId],
        (chats: ChatModel[]) => [
          ...chats,
          new ChatModel(result.data.id, result.data.name, channelId),
        ],
      );
    }
  };

  return (
    <Group className={styles['app-chat-sidebar__wrapper']}>
      <ModalPrompt
        title={<Title order={2}>Новый чат</Title>}
        centered
        label="Название чата"
        placeholder="Введите название"
        submitLabel="Создать"
        opened={isOpen}
        onClose={close}
        onSubmit={onSubmit}
      />

      <ScrollArea className={styles['app-chat-sidebar']}>
        <Stack gap="xs">
          <ChatList channelId={channelId} {...rest} />

          <Button
            fullWidth
            variant="light"
            color="cyan"
            leftSection={<IconPlus strokeLinecap="round" />}
            onClick={open}
          >
            Новый чат
          </Button>
        </Stack>
      </ScrollArea>

      {children}
    </Group>
  );
};
