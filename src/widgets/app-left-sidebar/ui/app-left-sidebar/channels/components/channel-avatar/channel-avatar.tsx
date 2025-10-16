import { Avatar, Tooltip } from '@mantine/core';
import { Link } from '@tanstack/react-router';

import { CHANNEL_PAGE } from './constants';

import type { FC } from 'react';
import type { ChannelAvatarProps } from './types';

export const ChannelAvatar: FC<ChannelAvatarProps> = ({
  channel,
  isSelected = false,
}): React.ReactNode => (
  <Tooltip label={channel.name} position={'right'}>
    <Avatar
      variant={isSelected ? 'filled' : 'light'}
      radius="md"
      color={isSelected ? 'cyan' : undefined}
      // TODO: сделать обёртку для проброса пропсов компонента извне
      component={Link}
      to={`/${CHANNEL_PAGE}/${channel.id}`}
    >
      {channel.name.split(' ').at(0)?.at(0)?.toUpperCase()}
    </Avatar>
  </Tooltip>
);
