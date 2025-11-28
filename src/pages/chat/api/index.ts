import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryResult,
} from '@tanstack/react-query';

import { api } from '../../../shared/api';
import { MessageModel } from '../model';

import { MESSAGE_LIST_QUERY_KEY } from './constants';

export const useMessageList = (
  channelId: string,
  chatId: string,
): UseQueryResult<MessageModel[]> =>
  useQuery({
    queryKey: [MESSAGE_LIST_QUERY_KEY, channelId, chatId],
    queryFn: async () => {
      const messages = await api.message.getMessages(channelId, chatId);

      if (messages.error) {
        // TODO: Придумать более удачный способ перехвата ошибки
        throw new Error(messages.reason.join('\n'));
      }

      return messages.data.map(
        ({ id, content, senderId, chatId, createdAt }) =>
          new MessageModel(id, content, chatId, senderId, createdAt),
      );
    },
    staleTime: Infinity,
  });

export const useMessageSend = (channelId: string, chatId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) =>
      api.message.create({ channelId, chatId, content }),
    mutationKey: ['message-send', channelId, chatId],
    onSuccess: (response) => {
      if (!response.error) {
        const { id, content, chatId, senderId, createdAt } = response.data;

        queryClient.setQueryData(
          [MESSAGE_LIST_QUERY_KEY, channelId, chatId],
          (old: MessageModel[]) => [
            ...old,
            new MessageModel(id, content, chatId, senderId, createdAt),
          ],
        );
      }
    },
  });
};
