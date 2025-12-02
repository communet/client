import { IconPencil, IconTrash } from '@tabler/icons-react';

import type { ContextMenuItem } from '../../../../shared/ui';

export const CHAT_ITEM_CONTEXT_MENU_ITEMS = [
  {
    icon: <IconPencil size={16} />,
    label: 'Редактировать',
    value: 'update',
  },
  {
    icon: <IconTrash size={16} />,
    label: 'Удалить',
    value: 'delete',
    color: 'red',
  },
] as const satisfies ContextMenuItem[];
