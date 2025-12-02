import { IconPencil, IconTrash } from '@tabler/icons-react';

import type { ContextMenuItem } from '../../../../shared/ui';

export const CHANNEL_ITEM_CONTEXT_MENU_ITEMS = [
  {
    icon: <IconPencil size={16} />,
    value: 'update',
    label: 'Редактировать',
  },
  {
    color: 'red',
    icon: <IconTrash size={16} />,
    value: 'delete',
    label: 'Удалить',
  },
] as const satisfies ContextMenuItem[];
