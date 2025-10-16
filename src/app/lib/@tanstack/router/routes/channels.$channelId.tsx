import { createFileRoute, useParams } from '@tanstack/react-router';

import { ChannelPage } from '../../../../../pages/channel';

const RouteComponent = (): React.ReactNode => {
  const { channelId } = useParams({ strict: false });

  if (channelId) {
    return <ChannelPage channelId={channelId} />;
  }

  return <div>Channel not found</div>;
};

export const Route = createFileRoute('/channels/$channelId')({
  component: RouteComponent,
});
