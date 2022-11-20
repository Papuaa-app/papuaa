import { defineConfig } from 'vite';
import config from '@/build/vite.config';

export default defineConfig(({ command, mode }) => {
  if (command === 'serve') {

  }
  return config;
});