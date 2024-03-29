/// <reference types="vitest" />
import dts from 'vite-plugin-dts';
import { join } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/fnr-pg',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [
    react(),
    // dts({
    //   tsConfigFilePath: join(__dirname, 'tsconfig.app.json'),
    //   // Faster builds by skipping tests. Set this to false to enable type checking.
    //   skipDiagnostics: true,
    // }),
    viteTsConfigPaths({
      root: '../../',
      loose: true,
    }),
  ],
  // esbuild: {
  //   jsxInject: `import * as React from 'react'`,
  // },

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: '../../',
  //    }),
  //  ],
  // },

  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
