import { Group, ScrollArea, Stack } from '@mantine/core';

import { ChannelList } from './channels';
import styles from './styles.module.scss';

import type { FC } from 'react';
import type { AppLeftSidebarProps } from './types';

export const AppLeftSidebar: FC<AppLeftSidebarProps> = ({
  activeChannelId: _activeChannelId,
  children,
}) => {
  return (
    <Group h="100%" mah="100%" gap="md" align="flex-start">
      <ScrollArea className={styles['app-left-sidebar']}>
        <Stack gap="sm">
          <ChannelList selectedId={'123'} />
        </Stack>
      </ScrollArea>

      {children}
    </Group>
  );
};
