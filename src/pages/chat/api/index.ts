import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from '@tanstack/react-query';

import { api } from '../../../shared/api';
import { MessageModel } from '../model';

const MESSAGE_LIST_QUERY_KEY = 'message-list';

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

export const useMessageSend = (
  channelId: string,
  chatId: string,
): UseMutationResult<
  Awaited<ReturnType<typeof api.message.create>>,
  Error,
  string
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) =>
      api.message.create({ channelId, chatId, content }),
    mutationKey: ['message-send', channelId, chatId],
    onSuccess: (response) => {
      if (!response.error) {
        queryClient.setQueryData(
          [MESSAGE_LIST_QUERY_KEY, channelId, chatId],
          (old: MessageModel[]) => {
            if (old) {
              return [
                ...old,
                new MessageModel(
                  response.data.id,
                  response.data.content,
                  response.data.chatId,
                  response.data.senderId,
                  response.data.createdAt,
                ),
              ];
            }
          },
        );
      }
    },
  });
};
