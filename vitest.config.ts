import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'url';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: [],
    testTimeout: 10000,
    server: {},
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
