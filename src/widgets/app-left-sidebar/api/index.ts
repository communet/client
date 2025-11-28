import { useMutation, useQuery } from '@tanstack/react-query';

import { api } from '../../../shared/api';
import { ChannelModel } from '../model';

import { CHANNEL_LIST_QUERY_KEY } from './constants';

export const useChannelList = () =>
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

export const useCreateChannel = () =>
  useMutation({
    mutationFn: api.channel.create,
    mutationKey: ['channel-create'],
    onSuccess: (response, __, _, context) => {
      if (response.error) {
        // TODO: Придумать более удачный способ перехвата ошибки
        throw new Error(response.reason.join('\n'));
      }

      context.client.setQueriesData(
        { queryKey: [CHANNEL_LIST_QUERY_KEY] },
        (channels: ChannelModel[]) => [
          ...channels,
          new ChannelModel(
            response.data.id,
            response.data.name,
            response.data.creatorId,
          ),
        ],
      );
    },
  });

export const useUpdateChannel = () =>
  useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      api.channel.update(id, name),
    mutationKey: ['channel-update'],
    onSuccess: (response, __, _, context) => {
      if (response.error) {
        // TODO: Придумать более удачный способ перехвата ошибки
        throw new Error(response.reason.join('\n'));
      }

      context.client.setQueriesData(
        { queryKey: [CHANNEL_LIST_QUERY_KEY] },
        (channels: ChannelModel[]) =>
          channels.map((channel) => {
            if (channel.id === response.data.id) {
              return new ChannelModel(
                response.data.id,
                response.data.name,
                response.data.creatorId,
              );
            }

            return channel;
          }),
      );
    },
  });

export const useDeleteChannel = () =>
  useMutation({
    mutationFn: api.channel.delete,
    mutationKey: ['channel-delete'],
    onSuccess: (response, id, _, context) => {
      if (response.error) {
        // TODO: Придумать более удачный способ перехвата ошибки
        throw new Error(response.reason.join('\n'));
      }

      context.client.setQueriesData(
        { queryKey: [CHANNEL_LIST_QUERY_KEY] },
        (channels: ChannelModel[]) =>
          channels.filter((channel) => channel.id !== id),
      );
    },
  });
