import { Loader, ScrollArea, Stack } from '@mantine/core';
import {
  useEffect,
  useImperativeHandle,
  useRef,
  type FC,
  type Ref,
} from 'react';

import { useMessageList } from '../../api';
import { MessageItem } from '../message-item';

import styles from './styles.module.scss';

export type MessageListProps = {
  channelId: string;
  chatId: string;
  ref?: Ref<{ scrollToBottom: () => void }>;
};

export const MessageList: FC<MessageListProps> = ({
  channelId,
  chatId,
  ref,
}: MessageListProps) => {
  const scrollViewport = useRef<HTMLDivElement>(null);
  const messages = useMessageList(channelId, chatId);
  const isScrollTriggeredOnce = useRef(false);

  useEffect(() => {
    if (!scrollViewport.current || isScrollTriggeredOnce.current) {
      return;
    }

    scrollViewport.current?.scrollTo({
      top: scrollViewport.current.scrollHeight,
      behavior: 'smooth',
    });

    isScrollTriggeredOnce.current = true;
  });

  useImperativeHandle(ref, () => ({
    scrollToBottom: (): void => {
      scrollViewport.current?.scrollTo({
        top: scrollViewport.current.scrollHeight,
        behavior: 'smooth',
      });
    },
  }));

  if (messages.isLoading) {
    return <Loader color="cyan" size="md" />;
  }

  return (
    <ScrollArea
      viewportRef={scrollViewport}
      offsetScrollbars
      className={styles['message-list']}
    >
      <Stack align="stretch" gap="xs">
        {messages.data &&
          messages.data.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
      </Stack>
    </ScrollArea>
  );
};
