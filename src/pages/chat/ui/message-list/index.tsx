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

  const scrollBottom = (behavior: ScrollBehavior): void => {
    scrollViewport.current?.scrollTo({
      top: scrollViewport.current.scrollHeight,
      behavior,
    });
  };

  useEffect(() => {
    if (!scrollViewport.current || messages.isPending) {
      return;
    }

    scrollBottom('smooth');
  }, [chatId, messages.isPending]);

  useImperativeHandle(ref, () => ({
    scrollToBottom: (): void => scrollBottom('smooth'),
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
