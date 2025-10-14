import compose from 'compose-function';

import { withMantine } from './with-mantine';
import { withQuery } from './with-query';
import { withRouter } from './with-router';
import { withStrictMode } from './with-strict-mode';

export const withProviders = compose(
  withQuery,
  withStrictMode,
  withMantine,
  withRouter,
);
