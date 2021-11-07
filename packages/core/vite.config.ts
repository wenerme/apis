import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { buildModuleOptions } from './vite.module';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  build: buildModuleOptions({ name: 'core' }),
});
