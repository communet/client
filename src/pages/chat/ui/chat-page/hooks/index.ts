import { useState } from 'react';

export const useMessageInputControl = (
  onSubmit?: (content: string) => void,
): {
  value: string;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
} => {
  const [value, setValue] = useState('');

  const reset = (): void => {
    setValue('');
  };

  const onKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();

      onSubmit?.(value);

      reset();
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setValue(e.target.value);
  };

  return {
    value,

    onKeyDown,
    onChange,
  };
};
