import { Outlet } from '@tanstack/react-router';

import { AppLeftSidebar } from '../../../widgets/app-left-sidebar';

import type { FC } from 'react';

export const MainPage: FC = () => {
  return (
    <AppLeftSidebar>
      <Outlet />
    </AppLeftSidebar>
  );
};
