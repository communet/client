import { Menu } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';

import { useChannelMenu } from './hooks';

import type { ChannelContextMenuProps } from './types';
import type { FC } from 'react';

export const ChannelContextMenu: FC<ChannelContextMenuProps> = ({
  onDelete,
  onUpdate,

  children,
}) => {
  const { isOpen, handleContextMenu, handleCloseMenu } = useChannelMenu();

  return (
    <Menu
      position="right"
      opened={isOpen}
      shadow="md"
      onClose={handleCloseMenu}
      closeOnClickOutside
      closeOnEscape
    >
      <Menu.Target>
        <div onContextMenu={handleContextMenu}>{children}</div>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Действия</Menu.Label>

        <Menu.Item leftSection={<IconPencil size={16} />} onClick={onUpdate}>
          Редактировать
        </Menu.Item>

        <Menu.Item
          color="red"
          leftSection={<IconTrash size={16} />}
          onClick={onDelete}
        >
          Удалить
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
