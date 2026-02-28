import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Konfigurasi standar untuk pengujian Unit & Integration Test React
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './setupTests.js',
  },
});