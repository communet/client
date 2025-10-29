import { Outlet } from '@tanstack/react-router';

import { AppLeftSidebar } from '../../../widgets/app-left-sidebar';

import { ChatSidebar } from './chat-sidebar';

import type { FC } from 'react';
import type { ChannelPageProps } from './types';

export const ChannelPage: FC<ChannelPageProps> = ({ channelId, chatId }) => {
  return (
    <AppLeftSidebar>
      <ChatSidebar chatId={chatId} channelId={channelId}>
        <Outlet />
      </ChatSidebar>
    </AppLeftSidebar>
  );
};
