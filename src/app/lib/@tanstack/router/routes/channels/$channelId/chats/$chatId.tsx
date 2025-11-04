import { createFileRoute, useParams } from '@tanstack/react-router';

import { ChatPage } from '../../../../../../../../pages/chat';

const RouteComponent = (): React.ReactNode => {
  const { channelId, chatId } = useParams({ strict: false });

  if (channelId && chatId) {
    return <ChatPage chatId={chatId} channelId={channelId} />;
  }

  return <div>Chat not found</div>;
};

export const Route = createFileRoute('/channels/$channelId/chats/$chatId')({
  component: RouteComponent,
});
