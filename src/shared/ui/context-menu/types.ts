import type { MenuItemProps, MenuProps } from '@mantine/core';

export type ContextMenuItem = {
  value: string;
  label: string;
  icon?: React.ReactNode;
  children?: ContextMenuItem[];
  data?: unknown;
} & MenuItemProps;

export type ContextMenuProps = React.PropsWithChildren<
  {
    items: ContextMenuItem[];
    onClick?: (
      e: React.MouseEvent,
      value: ContextMenuItem['value'],
      data: ContextMenuItem['data'],
    ) => void;
  } & Pick<MenuProps, 'disabled'>
>;
