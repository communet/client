import { Button, Group, ScrollArea, Stack, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

import { ModalConfirm, ModalPrompt } from '../../../../shared/ui';

import { ChatList } from './../chat-list';
import styles from './styles.module.scss';
import { useCreateChatControls, useDeleteChatControls } from './hooks';

import type { FC } from 'react';
import type { ChatSidebarProps } from './types';

export const ChatSidebar: FC<ChatSidebarProps> = ({
  children,
  channelId,
  ...rest
}) => {
  const {
    isCreateChatModalOpen,
    openCreateChatModal,
    closeCreateChatModal,
    handleCreateChat,
  } = useCreateChatControls(channelId);
  const {
    isDeleteChatModalOpen,
    handleOpenDeleteChatModel,
    handleCloseDeleteChatModal,
    handleDeleteChat,
  } = useDeleteChatControls(channelId);

  return (
    <Group className={styles['app-chat-sidebar__wrapper']}>
      <ModalPrompt
        title={<Title order={2}>Новый чат</Title>}
        centered
        label="Название чата"
        placeholder="Введите название"
        submitLabel="Создать"
        opened={isCreateChatModalOpen}
        onClose={closeCreateChatModal}
        onSubmit={handleCreateChat}
      />

      <ModalConfirm
        title={<Title order={2}>Удалить чат</Title>}
        centered
        description="Вы действительно хотите удалить чат?"
        opened={isDeleteChatModalOpen}
        onClose={handleCloseDeleteChatModal}
        onAccept={handleDeleteChat}
      />

      <ScrollArea className={styles['app-chat-sidebar']}>
        <Stack gap="xs">
          <ChatList
            {...rest}
            onDelete={handleOpenDeleteChatModel}
            channelId={channelId}
          />

          <Button
            fullWidth
            variant="light"
            color="cyan"
            leftSection={<IconPlus strokeLinecap="round" />}
            onClick={openCreateChatModal}
          >
            Новый чат
          </Button>
        </Stack>
      </ScrollArea>

      {children}
    </Group>
  );
};
