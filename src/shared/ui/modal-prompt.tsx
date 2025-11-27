import {
  Button,
  Modal,
  Stack,
  TextInput,
  type ModalProps,
  type TextInputProps,
} from '@mantine/core';
import { useEffect, useRef, useState, type FC } from 'react';

export type ModalPromptProps = Omit<
  ModalProps,
  'children' | 'onSubmit' | 'defaultValue'
> &
  Pick<TextInputProps, 'placeholder' | 'label'> & {
    submitLabel?: string;
    defaultValue?: string;
    onSubmit: (value: string) => void | Promise<void>;
  };

export const ModalPrompt: FC<ModalPromptProps> = ({
  onSubmit,
  onClose,
  label,
  placeholder,
  title,
  submitLabel = 'Сохранить',
  defaultValue,
  opened,
  ...props
}) => {
  const previousOpenedState = useRef(opened);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (defaultValue && !previousOpenedState.current && opened) {
      setValue(defaultValue);
    }
  }, [defaultValue, opened]);

  const onFormSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    e.stopPropagation();

    if (error) {
      return;
    }

    setIsLoading(true);

    try {
      const result = onSubmit(value);

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
    setValue('');
    onClose();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
    setError('');
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
          <Stack gap="md" component="form" onSubmit={onFormSubmit}>
            <TextInput
              autoFocus
              disabled={isLoading}
              label={label}
              error={error}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
            />

            <Button loading={isLoading} type="submit">
              {submitLabel}
            </Button>
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};
