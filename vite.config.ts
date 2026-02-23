import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1100, // research-content chunk is lazy-loaded (dynamic import)
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          markdown: ['react-markdown'],
          sanitize: ['dompurify'],
        },
      },
    },
  },
})
