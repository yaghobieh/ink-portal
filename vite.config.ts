import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { existsSync } from 'fs';
import { resolve } from 'path';

const localInkRoot = resolve(__dirname, '../ink');
const localInkEntry = resolve(localInkRoot, 'dist/index.js');

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, __dirname, '');
  const useLocalInk =
    env.VITE_USE_LOCAL_INK === '1' || env.VITE_USE_LOCAL_INK === 'true';
  const aliasLocalInk = command === 'serve' && useLocalInk && existsSync(localInkEntry);
  const openAiProxyTarget = 'https://api.openai.com';

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
    server: {
      ...(aliasLocalInk
        ? {
            fs: {
              allow: [resolve(__dirname), localInkRoot],
            },
          }
        : {}),
      proxy: {
        '/openai-proxy': {
          target: openAiProxyTarget,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/openai-proxy/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              const key = env.VITE_OPENAI_API_KEY || env.OPENAI_API_KEY;
              if (key) {
                proxyReq.setHeader('Authorization', `Bearer ${key}`);
              }
            });
          },
        },
      },
    },
  };
});
