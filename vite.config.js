import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/gametracker-frontend/',

  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],

  build: {
    rollupOptions: {
      output: {
        // 👇 divide dependencias grandes en chunks separados
        manualChunks: {
          react: ['react', 'react-dom'],
          polyfills: [
            'core-js',
            'regenerator-runtime',
            'intersection-observer',
            'resize-observer-polyfill',
            'smoothscroll-polyfill',
            'whatwg-fetch'
          ]
        },
      },
    },
    // 👇 sube el límite de advertencia de tamaño
    chunkSizeWarningLimit: 1000,
  },
})
