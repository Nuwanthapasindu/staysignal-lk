import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // lucide-react is not installed — map it to a local icon shim.
      'lucide-react': fileURLToPath(new URL('./src/shared/lib/lucide-shim.jsx', import.meta.url)),
    },
  },
  build: {
    // lightningcss (default) rejects some valid @keyframes usage in the stylesheet
    cssMinify: false,
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
