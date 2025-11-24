import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { api } from '../../../shared/api';
import { ChannelModel } from '../model';

import { CHANNEL_LIST_QUERY_KEY } from './constants';

export const useChannelList = (): UseQueryResult<ChannelModel[]> =>
  useQuery({
    queryKey: [CHANNEL_LIST_QUERY_KEY],
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
