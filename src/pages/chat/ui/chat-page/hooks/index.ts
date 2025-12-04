import { useState } from 'react';

export const useMessageInputControl = (
  onSubmit?: (content: string) => void,
): {
  value: string;
  onKeyDown: (e: KeyboardEvent) => void;
  onChange: (content: string) => void;
} => {
  const [value, setValue] = useState('');

  const reset = (): void => {
    setValue('');
  };

  const onKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();

      onSubmit?.(value);

      reset();
    }
  };

  const onChange = (content: string): void => {
    setValue(content);
  };

  return {
    value,

    onKeyDown,
    onChange,
  };
};
