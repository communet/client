import {
  useMutation,
  useQuery,
  type UseQueryResult,
} from '@tanstack/react-query';

import { api } from '../../../shared/api';
import { ChatModel } from '../model';

import { CHAT_LIST_QUERY_KEY } from './constants';

export const useChatList = (channelId: string): UseQueryResult<ChatModel[]> =>
  useQuery({
    queryKey: [CHAT_LIST_QUERY_KEY, channelId],
    queryFn: async () => {
      const chats = await api.chat.getChats(channelId);

      if (chats.error) {
        // TODO: Придумать более удачный способ перехвата ошибки
        throw new Error(chats.reason.join('\n'));
      }

      return chats.data.map(
        ({ id, name, channelId }) => new ChatModel(id, name, channelId),
      );
    },
    staleTime: Infinity,
  });

export const useCreateChatMutation = () =>
  useMutation({
    mutationFn: ({ channelId, name }: { channelId: string; name: string }) =>
      api.chat.create(channelId, name),
    mutationKey: ['create-chat'],
    onSuccess: (response, __, _, context) => {
      if (response.error) {
        // TODO: Придумать более удачный способ перехвата ошибки
        throw new Error(response.reason.join('\n'));
      }

      context.client.setQueryData(
        [CHAT_LIST_QUERY_KEY, response.data.channelId],
        (chats: ChatModel[]) => [
          ...chats,
          new ChatModel(
            response.data.id,
            response.data.name,
            response.data.channelId,
          ),
        ],
      );
    },
  });

export const useDeleteChatMutation = () =>
  useMutation({
    mutationFn: ({
      chatId,
      channelId,
    }: {
      chatId: string;
      channelId: string;
    }) => api.chat.delete(channelId, chatId),
    mutationKey: ['delete-chat'],
    onSuccess: (response, variables, _, context) => {
      if (response.error) {
        // TODO: Придумать более удачный способ перехвата ошибки
        throw new Error(response.reason.join('\n'));
      }

      context.client.setQueryData(
        [CHAT_LIST_QUERY_KEY, variables.channelId],
        (chats: ChatModel[]) =>
          chats.filter((chat) => chat.id !== variables.chatId),
      );
    },
  });

export const useUpdateChatMutation = () =>
  useMutation({
    mutationFn: ({
      chatId,
      channelId,
      name,
    }: {
      chatId: string;
      channelId: string;
      name: string;
    }) => api.chat.update({ chatId, channelId, name }),
    mutationKey: ['channel-update'],
    onSuccess: (response, __, _, context) => {
      if (response.error) {
        // TODO: Придумать более удачный способ перехвата ошибки
        throw new Error(response.reason.join('\n'));
      }

      context.client.setQueryData(
        [CHAT_LIST_QUERY_KEY, response.data.channelId],
        (chats: ChatModel[]) =>
          chats.map((chat) =>
            chat.id === response.data.id
              ? new ChatModel(
                  chat.id,
                  response.data.name,
                  response.data.channelId,
                )
              : chat,
          ),
      );
    },
  });
