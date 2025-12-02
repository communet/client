import { useChannelList } from '../../api';
import { ChannelAvatar } from '../channel-avatar';
import { ContextMenu } from '../../../../shared/ui';

import { CHANNEL_ITEM_CONTEXT_MENU_ITEMS } from './constants';

import type { FC } from 'react';
import type {
  ChannelListContextMenuItemValue,
  ChannelListProps,
} from './types';

export const ChannelList: FC<ChannelListProps> = ({
  selectedId,

  onDelete,
  onUpdate,
}) => {
  const channelListQuery = useChannelList();

  const valueToEventMap: Record<
    ChannelListContextMenuItemValue,
    ChannelListProps['onDelete'] | ChannelListProps['onUpdate']
  > = {
    delete: onDelete,
    update: onUpdate,
  };

  return channelListQuery.data?.map((channel) => (
    <ContextMenu
      items={CHANNEL_ITEM_CONTEXT_MENU_ITEMS}
      key={channel.id}
      onClick={(_, value) =>
        valueToEventMap[value as ChannelListContextMenuItemValue]?.(channel)
      }
    >
      <ChannelAvatar channel={channel} isSelected={selectedId === channel.id} />
    </ContextMenu>
  ));
};
