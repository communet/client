import {
  Button,
  Group,
  Modal,
  Stack,
  Text,
  type ModalProps,
} from '@mantine/core';
import { useState, type FC } from 'react';

export type ModalConfirmProps = Omit<
  ModalProps,
  'children' | 'onSubmit' | 'defaultValue'
> & {
  description?: string;
  acceptLabel?: string;
  declineLabel?: string;
  onAccept: () => void | Promise<void>;
};

export const ModalConfirm: FC<ModalConfirmProps> = ({
  title,
  description,
  acceptLabel = 'Подтвердить',
  declineLabel = 'Отменить',
  onAccept = (): void => {},
  onClose = (): void => {},
  opened,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const onModalAccept = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    e.stopPropagation();

    if (error) {
      return;
    }

    setIsLoading(true);

    try {
      const result = onAccept();

      if (result instanceof Promise) {
        await result;
      }
    } catch (err) {
      setError((err as Error).message);

      throw err;
    } finally {
      setIsLoading(false);
    }

    onModalClose();
  };

  const onModalClose = (): void => {
    onClose();
  };

  const onModalRootClose = (): void => {
    if (!isLoading) {
      onModalClose();
    }
  };

  return (
    <Modal.Root opened={opened} {...props} onClose={onModalRootClose}>
      <Modal.Overlay blur={3} backgroundOpacity={0.55} />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title component="div">{title}</Modal.Title>
          <Modal.CloseButton disabled={isLoading} />
        </Modal.Header>
        <Modal.Body>
          <Stack gap="md">
            <Text>{description}</Text>

            <Group justify="space-between">
              <Button
                disabled={isLoading}
                variant="default"
                onClick={onModalClose}
              >
                {declineLabel}
              </Button>

              <Button loading={isLoading} color="cyan" onClick={onModalAccept}>
                {acceptLabel}
              </Button>
            </Group>
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};
