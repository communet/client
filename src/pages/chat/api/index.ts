import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { api } from '../../../shared/api';
import { MessageModel } from '../model';

export const useMessageList = (
  channelId: string,
  chatId: string,
): UseQueryResult<MessageModel[]> =>
  useQuery({
    queryKey: ['message-list', channelId, chatId],
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
