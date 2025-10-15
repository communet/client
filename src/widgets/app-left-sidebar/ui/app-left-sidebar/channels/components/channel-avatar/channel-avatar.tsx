import { Avatar } from '@mantine/core';
import { Link } from '@tanstack/react-router';

import type { FC } from 'react';
import type { ChannelAvatarProps } from './types';

export const ChannelAvatar: FC<ChannelAvatarProps> = ({
  channel,
  isSelected = false,
}): React.ReactNode => (
  <Avatar
    variant="light"
    radius="md"
    color={isSelected ? 'cyan' : undefined}
    // TODO: сделать обёртку для проброса пропсов компонента извне
    component={Link}
  >
    {channel.name.split(' ').at(0)?.at(0)?.toUpperCase()}
  </Avatar>
);
