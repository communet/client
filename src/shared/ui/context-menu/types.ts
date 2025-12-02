import type { MenuItemProps } from '@mantine/core';

export type ContextMenuItem = {
  value: string;
  label: string;
  icon?: React.ReactNode;
  children?: ContextMenuItem[];
  data?: unknown;
} & MenuItemProps;

export type ContextMenuProps<T extends ContextMenuItem> =
  React.PropsWithChildren<{
    items: T[];
    onClick?: (e: React.MouseEvent, value: T['value'], data: T['data']) => void;
  }>;
