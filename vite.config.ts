import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { existsSync } from 'fs';
import { resolve } from 'path';

const localInkRoot = resolve(__dirname, '../ink');
const localInkEntry = resolve(localInkRoot, 'dist/index.js');
const useLocalInk = existsSync(localInkEntry);

export default defineConfig(({ command }) => {
  const aliasLocalInk = command === 'serve' && useLocalInk;

  return {
    plugins: [react(), tsconfigPaths()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@config': resolve(__dirname, 'src/config'),
        '@hooks': resolve(__dirname, 'src/hooks'),
        '@forgedevstack/anvil': resolve(__dirname, 'src/shims/forgedevstack-anvil.ts'),
        ...(aliasLocalInk
          ? {
              '@forgedevstack/ink/styles.css': resolve(localInkRoot, 'dist/styles.css'),
              '@forgedevstack/ink/plugins/ai': resolve(localInkRoot, 'dist/plugins/ai/index.js'),
              '@forgedevstack/ink': localInkEntry,
            }
          : {}),
      },
    },
    optimizeDeps: aliasLocalInk
      ? {
          exclude: ['@forgedevstack/ink'],
        }
      : {
          include: ['@forgedevstack/ink'],
        },
    server: aliasLocalInk
      ? {
          fs: {
            allow: [resolve(__dirname), localInkRoot],
          },
        }
      : undefined,
  };
});
