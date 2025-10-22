import { Group, ScrollArea, Stack } from '@mantine/core';

import { ChatList } from './../chat-list';
import styles from './styles.module.scss';

import type { FC } from 'react';
import type { ChatSidebarProps } from './types';

export const ChatSidebar: FC<ChatSidebarProps> = ({ children, chatId }) => (
  <Group h="100%" mah="100%" gap="md" align="flex-start">
    <ScrollArea className={styles['app-chat-sidebar']} maw="350px">
      <Stack gap="xs">
        <ChatList chatId={chatId} />
      </Stack>
    </ScrollArea>

    {children}
  </Group>
);
