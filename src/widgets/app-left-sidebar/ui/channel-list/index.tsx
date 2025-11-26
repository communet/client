import { useChannelList } from '../../api';
import { ChannelAvatar } from '../channel-avatar';
import { ChannelContextMenu } from '../channel-context-menu/channel-context-menu';

import type { FC } from 'react';
import type { ChannelListProps } from './types';

export const ChannelList: FC<ChannelListProps> = ({
  selectedId,

  onDelete,
  onUpdate,
}) => {
  const channelListQuery = useChannelList();

  return (
    channelListQuery.data &&
    channelListQuery.data.map((channel) => (
      <ChannelContextMenu
        key={channel.id}
        onDelete={() => onDelete?.(channel)}
        onUpdate={() => onUpdate?.(channel)}
      >
        <ChannelAvatar
          channel={channel}
          isSelected={selectedId === channel.id}
        />
      </ChannelContextMenu>
    ))
  );
};
