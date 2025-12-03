import { Button, Group, ScrollArea, Stack, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

import { ModalConfirm, ModalPrompt } from '../../../../shared/ui';

import { ChatList } from './../chat-list';
import styles from './styles.module.scss';
import { useCreateChatControls, useDeleteChatControls } from './hooks';
import { useUpdateChatControls } from './hooks/use-update-chat-controls';

import type { FC } from 'react';
import type { ChatSidebarProps } from './types';

export const ChatSidebar: FC<ChatSidebarProps> = ({
  children,
  channelId,
  ...rest
}) => {
  const {
    isCreateChatModalOpen,
    handleCloseCreateChatModal,
    handleOpenCreateChatModal,
    handleCreateChat,
  } = useCreateChatControls(channelId);
  const {
    isDeleteChatModalOpen,
    selectedToDeleteChat,
    handleOpenDeleteChatModel,
    handleCloseDeleteChatModal,
    handleDeleteChat,
  } = useDeleteChatControls(channelId);
  const {
    isUpdateChatModalOpen,
    selectedToUpdateChat,
    handleOpenUpdateChatModal,
    handleCloseUpdateChatModal,
    handleUpdateChat,
  } = useUpdateChatControls(channelId);

  return (
    <Group className={styles['app-chat-sidebar__wrapper']}>
      <ModalPrompt
        title={<Title order={2}>Новый чат</Title>}
        centered
        label="Название чата"
        placeholder="Введите название"
        submitLabel="Создать"
        opened={isCreateChatModalOpen}
        onClose={handleCloseCreateChatModal}
        onSubmit={handleCreateChat}
      />

      <ModalPrompt
        title={<Title order={2}>Редактировать чат</Title>}
        centered
        label="Название чата"
        placeholder="Введите название"
        submitLabel="Сохранить"
        opened={isUpdateChatModalOpen && !!selectedToUpdateChat.current}
        defaultValue={selectedToUpdateChat.current?.name}
        onClose={handleCloseUpdateChatModal}
        onSubmit={handleUpdateChat}
      />

      <ModalConfirm
        title={<Title order={2}>Удалить чат</Title>}
        centered
        description="Вы действительно хотите удалить чат?"
        opened={isDeleteChatModalOpen && !!selectedToDeleteChat.current}
        onClose={handleCloseDeleteChatModal}
        onAccept={handleDeleteChat}
      />

      <ScrollArea className={styles['app-chat-sidebar']}>
        <Stack gap="xs">
          <ChatList
            {...rest}
            channelId={channelId}
            onDelete={handleOpenDeleteChatModel}
            onUpdate={handleOpenUpdateChatModal}
          />

          <Button
            fullWidth
            variant="light"
            color="cyan"
            leftSection={<IconPlus strokeLinecap="round" />}
            onClick={handleOpenCreateChatModal}
          >
            Новый чат
          </Button>
        </Stack>
      </ScrollArea>

      {children}
    </Group>
  );
};
