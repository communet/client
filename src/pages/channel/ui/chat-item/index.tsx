import { Button, Text, Tooltip } from '@mantine/core';
import { Link } from '@tanstack/react-router';

import { CHANNEL_PAGE } from '../../../../widgets/app-left-sidebar';

import { CHAT_PAGE } from './constants';

import type { FC } from 'react';
import type { ChatItemProps } from './types';

export const ChatItem: FC<ChatItemProps> = ({ chat, isActive }) => (
  <Tooltip label={chat.name}>
    <Button
      variant={isActive ? 'light' : 'subtle'}
      color="gray"
      size="md"
      fullWidth
      component={Link}
      to={`${CHANNEL_PAGE}/${chat.channelId}/${CHAT_PAGE}/${chat.id}`}
    >
      <Text truncate="end">{chat.name}</Text>
    </Button>
  </Tooltip>
);
