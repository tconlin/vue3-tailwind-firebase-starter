import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import path from 'path'

export default defineConfig({
  plugins: [
    VitePWA({
      includeAssets: [
        './img/icons/favicon.ico',
        './img/icons/apple-touch-icon.png'
      ],
      manifest: {
        name: 'Shortform',
        short_name: 'Shortform',
        description: 'Shortform Index Cards',
        icons: [
          {
            src: './img/icons/favicon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ],
        start_url: './index.html',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#FFFFFF'
      }
    }),
    vue({
      include: [/\.vue$/]
    }),
    WindiCSS()
  ],
  test: {
    global: true,
    environment: 'happy-dom'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3580
  }
})
