import { MantineProvider } from '@mantine/core';

export const withMantine =
  (component: () => React.ReactNode) => (): React.ReactNode => (
    <MantineProvider forceColorScheme="dark">{component()}</MantineProvider>
  );
