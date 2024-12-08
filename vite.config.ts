import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Group frequently used modules together
          vendor: ['react', 'react-dom'],
          // Separate chunk for workers
          workers: ['fetch.worker'],
        },
      },
    },
  },
});
