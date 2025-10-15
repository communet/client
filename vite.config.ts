// eslint-disable-next-line import/no-unresolved
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      generatedRouteTree: './src/app/lib/@tanstack/router/route-tree.gen.ts',
      routesDirectory: './src/app/lib/@tanstack/router/routes',
    }),
    react(),
  ],
});
