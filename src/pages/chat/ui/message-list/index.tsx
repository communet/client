import { Box, Loader, ScrollArea, Space, Stack } from '@mantine/core';
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
import { MAX_MESSAGE_TIME_GAP } from './constants';

import type { MessageModel } from '../../model';

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

    scrollBottom('instant');
  }, [chatId, messages.isPending]);

  useImperativeHandle(ref, () => ({
    scrollToBottom: () => scrollBottom('smooth'),
  }));

  if (messages.isLoading) {
    return <Loader className={styles.loader} color="cyan" size="md" />;
  }

  const isSameMessageGroup = (
    message: MessageModel,
    prevMessage?: MessageModel,
  ) => {
    return (
      prevMessage &&
      message.senderId === prevMessage.senderId &&
      message.createdAt.getTime() - prevMessage.createdAt.getTime() <
        MAX_MESSAGE_TIME_GAP
    );
  };

  return (
    <ScrollArea
      viewportRef={scrollViewport}
      offsetScrollbars
      className={styles['message-list']}
    >
      <Stack align="stretch" gap="0">
        {messages.data &&
          messages.data.map((message, index, messages) => {
            const isSameGroup = isSameMessageGroup(
              message,
              index == 0 ? undefined : messages[index - 1],
            );

            return (
              <Box key={message.id}>
                {!isSameGroup && index > 0 && <Space h="lg" />}

                <MessageItem message={message} isAvatarShown={!isSameGroup} />
              </Box>
            );
          })}
      </Stack>
    </ScrollArea>
  );
};
