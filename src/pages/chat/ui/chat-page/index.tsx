import { Flex, Transition } from '@mantine/core';

import { useIsMounted } from '../../../../shared/react';

import styles from './styles.module.scss';

import type { FC } from 'react';
import type { ChatPageProps } from './types';

export const ChatPage: FC<ChatPageProps> = ({ chatId, channelId }) => {
  const isMounted = useIsMounted();

  return (
    <Transition mounted={isMounted} transition="scale">
      {(transitionStyles) => (
        <Flex className={styles['app-chat']} style={transitionStyles}>
          You now in chat: {chatId} in channel: {channelId}
        </Flex>
      )}
    </Transition>
  );
};
