import { Button } from '@mantine/core';
import { Link } from '@tanstack/react-router';

import type { FC } from 'react';

export const AboutPage: FC = () => {
  return (
    <div>
      <h1>about page</h1>
      <Button component={Link} to="/">
        Home
      </Button>
    </div>
  );
};
