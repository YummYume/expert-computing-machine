import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    server: {
      watch: {
        usePolling: process.env.VITE_USE_POLLING === 'true',
      },
    },
    test: {
      include: ['src/**/*.{test,spec}.{js,ts}']
    },
  };
});
