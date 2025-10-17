import { AppLeftSidebar } from '../../../widgets/app-left-sidebar';

import { ChatSidebar } from './chat-sidebar';

import type { FC } from 'react';
import type { ChannelPageProps } from './types';

export const ChannelPage: FC<ChannelPageProps> = ({ channelId }) => (
  <AppLeftSidebar>
    <ChatSidebar chatId={'123'}>
      <div>Channel {channelId} Content</div>
    </ChatSidebar>
  </AppLeftSidebar>
);
