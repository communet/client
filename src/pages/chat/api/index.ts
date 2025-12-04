import {
  useMutation,
  useQuery,
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

export const useMessageSend = (channelId: string, chatId: string) =>
  useMutation({
    mutationFn: (content: string) =>
      api.message.create({ channelId, chatId, content }),
    mutationKey: ['message-send', channelId, chatId],
    onSuccess: (response, _, __, context) => {
      if (!response.error) {
        const { id, content, chatId, senderId, createdAt } = response.data;

        context.client.setQueryData(
          [MESSAGE_LIST_QUERY_KEY, channelId, chatId],
          (old: MessageModel[]) => [
            ...old,
            new MessageModel(id, content, chatId, senderId, createdAt),
          ],
        );
      }
    },
  });

export const useMessageUpdate = (channelId: string, chatId: string) =>
  useMutation({
    mutationFn: ({
      content,
      messageId,
    }: {
      content: string;
      messageId: string;
    }) => api.message.update({ channelId, chatId, content, messageId }),
    mutationKey: ['message-update', channelId, chatId],
    onMutate(variables, context) {
      const previousMessages = context.client.getQueryData<MessageModel[]>([
        MESSAGE_LIST_QUERY_KEY,
        channelId,
        chatId,
      ]);

      context.client.setQueryData(
        [MESSAGE_LIST_QUERY_KEY, channelId, chatId],
        (old: MessageModel[]) =>
          old.map((message) => {
            if (message.id === variables.messageId) {
              return new MessageModel(
                message.id,
                variables.content,
                message.chatId,
                message.senderId,
                message.createdAt,
              );
            }

            return message;
          }),
      );

      return {
        previousMessages,
      };
    },
    onError(_, __, mutateResult, context) {
      if (mutateResult) {
        context.client.setQueryData(
          [MESSAGE_LIST_QUERY_KEY, channelId, chatId],
          mutateResult.previousMessages,
        );
      }
    },
  });

export const useMessageDelete = (channelId: string, chatId: string) =>
  useMutation({
    mutationFn: (messageId: string) =>
      api.message.delete({ channelId, chatId, messageId }),
    mutationKey: ['message-delete', channelId, chatId],
    onSuccess: (response, variables, _, context) => {
      if (!response.error) {
        context.client.setQueryData(
          [MESSAGE_LIST_QUERY_KEY, channelId, chatId],
          (messages: MessageModel[]) =>
            messages.filter((message) => message.id !== variables),
        );
      }
    },
  });
