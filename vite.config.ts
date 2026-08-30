import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { existsSync } from 'fs';
import { resolve } from 'path';
import { PORT_INK_API } from './src/constants/numbers.const';

const localInkRoot = resolve(__dirname, '../ink');
const localInkEntry = resolve(localInkRoot, 'dist/index.js');
const localBearRoot = resolve(__dirname, '../bear');
const localBearEntry = resolve(localBearRoot, 'dist/index.js');
const localFormRoot = resolve(__dirname, '../forge-form');
const localFormEntry = resolve(localFormRoot, 'dist/index.mjs');

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, __dirname, '');
  const useLocalInk =
    env.VITE_USE_LOCAL_INK === '1' || env.VITE_USE_LOCAL_INK === 'true';
  const aliasLocalInk = command === 'serve' && useLocalInk && existsSync(localInkEntry);
  const aliasLocalBear = existsSync(localBearEntry);
  const aliasLocalForm = existsSync(localFormEntry);
  const openAiProxyTarget = 'https://api.openai.com';

  return {
    plugins: [react(), tsconfigPaths()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@config': resolve(__dirname, 'src/config'),
        '@hooks': resolve(__dirname, 'src/hooks'),
        '@utils': resolve(__dirname, 'src/utils'),
        '@sdk': resolve(__dirname, 'src/sdk'),
        '@forgedevstack/anvil': resolve(__dirname, 'src/shims/forgedevstack-anvil.ts'),
        vue: resolve(__dirname, 'src/shims/vue.ts'),
        ...(aliasLocalInk
          ? {
              '@forgedevstack/ink/styles.css': resolve(localInkRoot, 'dist/styles.css'),
              '@forgedevstack/ink/plugins/ai': resolve(localInkRoot, 'dist/plugins/ai/index.js'),
              '@forgedevstack/ink': localInkEntry,
            }
          : {}),
        ...(aliasLocalBear
          ? {
              '@forgedevstack/bear/styles.css': resolve(localBearRoot, 'dist/styles.css'),
              '@forgedevstack/bear': localBearEntry,
            }
          : {}),
        ...(aliasLocalForm
          ? {
              '@forgedevstack/forge-form': localFormEntry,
            }
          : {}),
      },
    },
    optimizeDeps: {
      include: aliasLocalInk ? [] : ['@forgedevstack/ink'],
      exclude: [
        '@forgedevstack/anvil',
        ...(aliasLocalInk ? ['@forgedevstack/ink'] : []),
        ...(aliasLocalBear ? ['@forgedevstack/bear'] : []),
        ...(aliasLocalForm ? ['@forgedevstack/forge-form'] : []),
      ],
    },
    server: {
      host: true,
      fs: {
        allow: [resolve(__dirname), localInkRoot, localBearRoot, localFormRoot],
      },
      proxy: {
        '/api': {
          target: `http://127.0.0.1:${PORT_INK_API}`,
          changeOrigin: true,
          ws: true,
        },
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
