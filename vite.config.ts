import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@config': resolve(__dirname, 'src/config'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@forgedevstack/anvil': resolve(__dirname, 'src/shims/forgedevstack-anvil.ts'),
    },
  },
  optimizeDeps: {
    include: ['@forgedevstack/ink'],
  },
});

