import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'sitepet': resolve(__dirname, 'packages/sitepet/src/index.ts'),
      'sitepet/react': resolve(__dirname, 'packages/sitepet/src/react/index.tsx'),
      'sitepet/style.css': resolve(__dirname, 'packages/sitepet/src/style.css'),
    },
  },
  server: {
    port: 3000,
    host: true,
    allowedHosts: true,
  },
  preview: {
    port: 3000,
    host: true,
    allowedHosts: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
