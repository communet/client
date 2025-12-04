import { createRoot } from 'react-dom/client';

import { withProviders } from './providers';

import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import './general.scss';

const rootElement = document.getElementById('root');

if (rootElement && !rootElement?.innerHTML) {
  const root = createRoot(rootElement);

  root.render(withProviders(() => null)());
}
