import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { api } from '../../../shared/api';
import { ChannelModel } from '../model';

export const useChannelList = (): UseQueryResult<ChannelModel[]> =>
  useQuery({
    queryKey: ['channel-list'],
    queryFn: async () => {
      const channels = await api.channel.getChannels();

      if (channels.error) {
        // TODO: Придумать более удачный способ перехвата ошибки
        throw new Error(channels.reason.join('\n'));
      }

      return channels.data.map(
        ({ id, name, creatorId }) => new ChannelModel(id, name, creatorId),
      );
    },
    staleTime: Infinity,
  });
