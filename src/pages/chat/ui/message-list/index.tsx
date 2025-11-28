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
    scrollToBottom: (): void => scrollBottom('smooth'),
  }));

  if (messages.isLoading) {
    return <Loader className={styles.loader} color="cyan" size="md" />;
  }

  return (
    <ScrollArea
      viewportRef={scrollViewport}
      offsetScrollbars
      className={styles['message-list']}
    >
      <Stack align="stretch" gap="0">
        {messages.data &&
          messages.data.map((message, index, messages) => {
            const isSameAuthor =
              index > 0 && message.senderId === messages[index - 1].senderId;

            return (
              <Box key={message.id}>
                {!isSameAuthor && index > 0 && <Space h="lg" />}

                <MessageItem message={message} isAvatarShown={!isSameAuthor} />
              </Box>
            );
          })}
      </Stack>
    </ScrollArea>
  );
};
