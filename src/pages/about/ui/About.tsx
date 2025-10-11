import { Button } from '@mantine/core';
import { Link } from '@tanstack/react-router';

import type { FC } from 'react';

export const AboutPage: FC = () => {
  return (
    <div>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        about page
      </h1>
      <Button component={Link} to="/">
        Home
      </Button>
    </div>
  );
};
