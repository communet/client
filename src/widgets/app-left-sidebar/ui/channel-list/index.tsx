import { useChannelList } from '../../api';
import { ChannelAvatar } from '../channel-avatar';
import { ContextMenu } from '../../../../shared/ui';

import { CHANNEL_ITEM_CONTEXT_MENU_ITEMS } from './constants';

import type { FC } from 'react';
import type { ChannelListProps } from './types';

export const ChannelList: FC<ChannelListProps> = ({
  selectedId,

  onDelete,
  onUpdate,
}) => {
  const channelListQuery = useChannelList();

  const valueToEventMap: Record<
    (typeof CHANNEL_ITEM_CONTEXT_MENU_ITEMS)[number]['value'],
    ChannelListProps['onDelete'] | ChannelListProps['onUpdate']
  > = {
    delete: onDelete,
    update: onUpdate,
  };

  return (
    channelListQuery.data &&
    channelListQuery.data.map((channel) => (
      <ContextMenu
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        items={CHANNEL_ITEM_CONTEXT_MENU_ITEMS}
        key={channel.id}
        onClick={(_, value) => valueToEventMap[value]!(channel)}
      >
        <ChannelAvatar
          channel={channel}
          isSelected={selectedId === channel.id}
        />
      </ContextMenu>
    ))
  );
};
