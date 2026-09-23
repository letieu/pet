import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SitePet',
      formats: ['umd'],
      fileName: () => 'sitepet.min.js',
    },
  },
});
