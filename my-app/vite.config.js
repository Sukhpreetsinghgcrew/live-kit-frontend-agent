import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'alert-physiology-ms-worth.trycloudflare.com' // add your Cloudflare tunnel host here
    ]
  }
})
