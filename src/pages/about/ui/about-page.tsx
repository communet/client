import { Button } from '@mantine/core';
import { Link } from '@tanstack/react-router';

import { AppLeftSidebar } from '../../../widgets/app-left-sidebar';

import type { FC } from 'react';

export const AboutPage: FC = () => {
  return (
    <AppLeftSidebar>
      <h1>about page</h1>
      <Button component={Link} to="/">
        Home
      </Button>
    </AppLeftSidebar>
  );
};
