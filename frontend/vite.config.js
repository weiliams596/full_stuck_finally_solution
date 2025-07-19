import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server:{
    host:'0.0.0.0',
    port:5173,// default port
    open:true,
    allowedHosts:['localhost'],
    proxy:{
      '/api':{
        target:'http://localhost:5000',
        changeOrigin:true,
        rewrite:path => path.replace(/^\/api/, '')
      }
    }
  }
});
