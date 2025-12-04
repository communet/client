import { Box, Menu } from '@mantine/core';

import { useContextMenu } from './hooks';

import type { ContextMenuItem, ContextMenuProps } from './types';

export const ContextMenu = ({
  items,
  children,
  disabled,
  onClick,
}: ContextMenuProps) => {
  const { isOpen, handleContextMenu, handleCloseMenu } = useContextMenu();

  const ContextMenuItem = ({
    value,
    label,
    icon,
    data,
    children,
    ...rest
  }: ContextMenuItem) =>
    children ? (
      <SubContextMenu
        key={value}
        target={{ value, label, icon, data, children, ...rest }}
      />
    ) : (
      <Menu.Item
        {...rest}
        key={value}
        value={value}
        leftSection={icon}
        onClick={(e) => onClick?.(e, value, data)}
      >
        {label}
      </Menu.Item>
    );

  const SubContextMenu = ({
    target: { value, label, icon, children, data: _data, ...rest },
  }: {
    target: ContextMenuItem;
  }) => (
    <Menu.Sub>
      <Menu.Sub.Target>
        <Menu.Sub.Item {...rest} key={value} value={value} leftSection={icon}>
          {label}
        </Menu.Sub.Item>
      </Menu.Sub.Target>

      {children?.length && (
        <Menu.Sub.Dropdown>{children.map(ContextMenuItem)}</Menu.Sub.Dropdown>
      )}
    </Menu.Sub>
  );

  return (
    <Menu
      position="right"
      opened={isOpen}
      shadow="md"
      withArrow
      closeOnClickOutside
      closeOnEscape
      disabled={disabled}
      onClose={handleCloseMenu}
    >
      <Menu.Target>
        <Box onContextMenu={handleContextMenu}>{children}</Box>
      </Menu.Target>

      {items?.length && (
        <Menu.Dropdown>{items.map(ContextMenuItem)}</Menu.Dropdown>
      )}
    </Menu>
  );
};
