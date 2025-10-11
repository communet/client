import { Button } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';

import { api } from '../../../shared/api';

import type { FC } from 'react';

export const MainPage: FC = () => {
  const query = useQuery({
    queryKey: ['getMe'],
    queryFn: () => api.user.getMe(),
  });

  return (
    <div>
      <h1>main page</h1>

      <Button component={Link} to="/about">
        About
      </Button>

      <Button
        color={query.data?.error ? 'red' : 'green'}
        variant="default"
        loading={!query.data}
      >
        {query.data && !query.data.error
          ? `User(${query.data.data.id}): ${query.data.data.username}`
          : query.data?.reason.join('/')}
      </Button>
    </div>
  );
};
