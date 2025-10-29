import { createFileRoute, useParams } from '@tanstack/react-router';

import { ChannelPage } from '../../../../../../../pages/channel';

const RouteComponent = (): React.ReactNode => {
  const { channelId, chatId } = useParams({ strict: false });

  if (channelId) {
    return <ChannelPage channelId={channelId} chatId={chatId} />;
  }

  return <div>Channel not found</div>;
};

export const Route = createFileRoute('/channels/$channelId')({
  component: RouteComponent,
});
