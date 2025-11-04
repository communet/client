import { Button, Group, ScrollArea, Stack } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

import { ChatList } from './../chat-list';
import styles from './styles.module.scss';

import type { FC } from 'react';
import type { ChatSidebarProps } from './types';

export const ChatSidebar: FC<ChatSidebarProps> = ({ children, ...rest }) => (
  <Group className={styles['app-chat-sidebar__wrapper']}>
    <ScrollArea className={styles['app-chat-sidebar']}>
      <Stack gap="xs">
        <ChatList {...rest} />

        <Button
          fullWidth
          variant="light"
          color="cyan"
          leftSection={<IconPlus strokeLinecap="round" />}
        >
          Новый чат
        </Button>
      </Stack>
    </ScrollArea>

    {children}
  </Group>
);
