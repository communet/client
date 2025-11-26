import type { PropsWithChildren } from 'react';

export type ChannelContextMenuProps = PropsWithChildren<{
  onDelete?: () => void;
  onUpdate?: () => void;
}>;
