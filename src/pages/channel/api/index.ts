import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { api } from '../../../shared/api';
import { ChatModel } from '../model';

export const useChatList = (channelId: string): UseQueryResult<ChatModel[]> =>
  useQuery({
    queryKey: ['chat-list', channelId],
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
