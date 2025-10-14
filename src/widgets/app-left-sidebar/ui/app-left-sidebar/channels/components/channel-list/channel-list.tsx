import { useChannelList } from '../../channel-api';
import { ChannelAvatar } from '../channel-avatar';

import type { FC } from 'react';
import type { ChannelListProps } from './types';

export const ChannelList: FC<ChannelListProps> = ({ selectedId, ...rest }) => {
  const channelListQuery = useChannelList();

  return (
    channelListQuery.data && (
      <>
        {channelListQuery.data.map((channel) => (
          <ChannelAvatar
            key={channel.id}
            channel={channel}
            isSelected={selectedId === channel.id}
            {...rest}
          />
        ))}
      </>
    )
  );
};
