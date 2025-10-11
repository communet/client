import { Loader2Icon } from 'lucide-react';

import { cn } from '../../internal/utils';

function Spinner({
  className,
  ...props
}: React.ComponentProps<'svg'>): React.JSX.Element {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  );
}

export { Spinner };
