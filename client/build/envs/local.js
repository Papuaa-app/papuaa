import { defineConfig } from 'vite';
const config = require('@/build/vite.config');

export default defineConfig({
  ...config,
  mode: 'development',
  logLevel: 'info',
  server: {
    hmr: true,
  }
});