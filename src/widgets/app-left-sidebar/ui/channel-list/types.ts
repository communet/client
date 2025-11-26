import type { ChannelModel } from '../../model';

export type ChannelListProps = {
  selectedId?: ChannelModel['id'];

  onDelete?: (id: ChannelModel) => void;
  onUpdate?: (id: ChannelModel) => void;
};
