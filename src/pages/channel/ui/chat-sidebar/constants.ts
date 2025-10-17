import { ChatModel } from './chat.model';

export const CHAT_PAGE = 'chats';

export const MOCK_CHATS = [
  new ChatModel(
    '123',
    'Some chat with very very super very mega super very long name',
    '123',
  ),
  new ChatModel('456', 'Some', '123'),
  new ChatModel('789', 'Chat', '123'),
  new ChatModel('abc', 'Test', '123'),
  new ChatModel('def', '???', '123'),
];
