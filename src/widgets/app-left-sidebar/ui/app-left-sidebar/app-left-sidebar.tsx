import { Group, ScrollArea, Stack } from '@mantine/core';
import { useParams } from '@tanstack/react-router';

import { ChannelList } from '../channel-list';

import styles from './styles.module.scss';

import type { FC } from 'react';
import type { AppLeftSidebarProps } from './types';

export const AppLeftSidebar: FC<AppLeftSidebarProps> = ({
  activeChannelId: _activeChannelId,
  children,
}) => {
  const { channelId } = useParams({ strict: false });

  return (
    <Group h="100%" mah="100%" gap="md" align="flex-start">
      <ScrollArea className={styles['app-left-sidebar']}>
        <Stack gap="md">
          <ChannelList selectedId={channelId} />
        </Stack>
      </ScrollArea>

      {children}
    </Group>
  );
};
