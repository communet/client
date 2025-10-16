import { Group } from '@mantine/core';

import { AppLeftSidebar } from '../../../widgets/app-left-sidebar';

import type { FC } from 'react';
import type { ChannelPageProps } from './types';

export const ChannelPage: FC<ChannelPageProps> = ({ channelId }) => (
  <AppLeftSidebar>
    <Group gap="md">
      <div>Chat sidebar</div>
      <div>Channel {channelId} Content</div>
    </Group>
  </AppLeftSidebar>
);
