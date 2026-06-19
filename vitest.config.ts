import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    globals: true,
    css: false,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,tsx}', 'scripts/**/*.mjs'],
      exclude: [
        'src/messages/**',
        'src/**/*.d.ts',
        'src/i18n/request.ts',
        // Thin one-line wrapper around next-intl's createNavigation(), which
        // pulls in next/navigation internally — Vite/Vitest can't resolve that
        // through Next's ESM export map. No custom logic here to test; the
        // app-level mock of this module (test/setup.ts) is what every other
        // component/page test exercises instead.
        'src/i18n/navigation.ts',
      ],
      thresholds: {
        lines: 80,
        statements: 80,
        functions: 80,
        branches: 80,
      },
    },
  },
});
