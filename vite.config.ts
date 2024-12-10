import path from 'path';
import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, PluginOption } from 'vite';
import htmlConfig from 'vite-plugin-html-config';

export default defineConfig(() => ({
  plugins: [
    react(),
    htmlConfig({
      metas: [{ name: 'version', content: `${process.env.npm_package_version}.AZURE_BUILD_VERSION` }],
    }),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }) as unknown as PluginOption,
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    globals: true,
  },
}));
