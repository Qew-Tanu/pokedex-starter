import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Qew-Tanu/',
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
})
